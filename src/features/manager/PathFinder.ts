// types
enum ParamName {
  brandId = "[brandId]",
  productId = "[productId]",
}

enum SearchParamName {
  categoryId = "mcat",
  subCategoryId = "scat",
  actionFeedback = "afeed",
}

enum PathTo {
  manager = "/manager",

  brands = manager + "/brands",
  brandNew = brands + "/new",
  brandEdit = brands + `/${ParamName.brandId}`,

  products = manager + "/products",
  productNew = products + "/new",
  productEdit = products + `/${ParamName.productId}`,

  productImages = "/product-images",
  brandLogos = "/brand-logos",
  imagePlaceholder = "/image.svg",
}

const REMOTE_HOSTNAME = "images.unsplash.com";

export default class PathFinder {
  static toAllBrands = () => PathTo.brands;
  static toAllProducts = () => PathTo.products;

  static toProductsByCategory = (categoryId: string) => `${PathTo.products}?${SearchParamName.categoryId}=${categoryId}`;
  static toProductsByCategoryAndSubCategory = (categoryId: string, subCategoryId: string) =>
    `${PathFinder.toProductsByCategory(categoryId)}&${SearchParamName.subCategoryId}=${subCategoryId}`;

  static toBrandNew = () => PathTo.brandNew;
  static toBrandEdit = (brandId: string) => PathTo.brandEdit.replace(ParamName.brandId, brandId);
  static toBrandEditFeedback = (brandId: string) => `${PathFinder.toBrandEdit(brandId)}?${SearchParamName.actionFeedback}`;

  static toProductNew = () => PathTo.productNew;
  static toProductEdit = (productId: string) => PathTo.productEdit.replace(ParamName.productId, productId);
  static toProductEditFeedback = (productId: string) => `${PathFinder.toProductEdit(productId)}?${SearchParamName.actionFeedback}`;

  static toImagePlaceholder = () => PathTo.imagePlaceholder;

  static toResolvedProductImage = (imageUrl?: string) => PathFinder.toProductImage(imageUrl) ?? PathFinder.toImagePlaceholder();
  static toResolvedBrandLogo = (logoUrl?: string | null) => PathFinder.toBrandLogo(logoUrl) ?? PathFinder.toImagePlaceholder();

  static toProductImage = (imageUrl?: string) => {
    if (imageUrl && PathFinder.isImageSrcParsable(imageUrl)) {
      // Are we dealing with a relative url, implying that a local picture already exists on the server?
      if (imageUrl.startsWith("/")) {
        return `${PathTo.productImages}${imageUrl}`;
      }
      return imageUrl;
    }
    return undefined;
  };

  static toBrandLogo = (logoUrl?: string | null) => {
    if (logoUrl && PathFinder.isImageSrcParsable(logoUrl)) {
      // Are we dealing with a relative url, implying that a local picture already exists on the server?
      if (logoUrl.startsWith("/")) {
        return `${PathTo.brandLogos}${logoUrl}`;
      }
      return logoUrl;
    }
    return undefined;
  };

  // Do a little parsing to ensure that the src is right, and "next/image" will not throw an exception
  private static isImageSrcParsable(imageSrc: string) {
    // Protocol-relative url (//) must be changed to an absolute url (http:// or https://)
    if (imageSrc.startsWith("//")) return false;

    // Are we working with a relative url? If so, proceed as a valid source
    if (imageSrc.startsWith("/")) return true;

    // Finally, we must deal with a complete url; ensure that it is parsable as well
    let parsedSrc;
    try {
      parsedSrc = new URL(imageSrc);
    } catch (error) {
      return false;
    }

    // Right now, we only support "images.unsplash.com" as our possible remote hostname
    if (parsedSrc.hostname !== REMOTE_HOSTNAME) return false;

    // The src seems to be ok
    return true;
  }
}
