// types
enum ParamName {
  brandId = "[brandId]",
  categoryId = "[categoryId]",
  subCategoryId = "[subCategoryId]",
  productId = "[productId]",
  captchaName = "[name]",
}

enum SearchParamName {
  categoryId = "mcat",
  subCategoryId = "scat",
  actionFeedback = "afeed",
}

enum PathTo {
  managerLogin = "/auth/login",

  manager = "/manager",

  brands = manager + "/brands",
  brandNew = brands + "/new",
  brandEdit = brands + `/${ParamName.brandId}`,

  categories = manager + "/categories",
  categoryNew = categories + "/new",
  categoryEdit = categories + `/${ParamName.categoryId}`,

  subCategories = manager + "/subcategories",
  subCategoryNew = subCategories + "/new",
  subCategoryEdit = subCategories + `/${ParamName.subCategoryId}`,

  products = manager + "/products",
  productNew = products + "/new",
  productEdit = products + `/${ParamName.productId}`,

  charts = manager + "/charts",

  productImages = "/product-images",
  brandLogos = "/brand-logos",
  imagePlaceholder = "/image.svg",

  captcha = "/auth/captcha" + `/${ParamName.captchaName}`,
}

const REMOTE_HOSTNAMES = ["images.unsplash.com", "plus.unsplash.com"];

export default class PathFinder {
  static toManagerLogin = () => PathTo.managerLogin;

  static toManagerHome = () => PathTo.manager;
  static toAllBrands = () => PathTo.brands;
  static toAllCategories = () => PathTo.categories;
  static toAllSubCategories = () => PathTo.subCategories;
  static toAllProducts = () => PathTo.products;

  static toAllCharts = () => PathTo.charts;

  static toProductsByCategory = (categoryId: string) => `${PathTo.products}?${SearchParamName.categoryId}=${categoryId}`;
  static toProductsByCategoryAndSubCategory = (categoryId: string, subCategoryId: string) =>
    `${PathFinder.toProductsByCategory(categoryId)}&${SearchParamName.subCategoryId}=${subCategoryId}`;

  static toBrandNew = () => PathTo.brandNew;
  static toBrandEdit = (brandId: string) => PathTo.brandEdit.replace(ParamName.brandId, brandId);
  static toBrandEditFeedback = (brandId: string) => `${PathFinder.toBrandEdit(brandId)}?${SearchParamName.actionFeedback}`;

  static toCategoryNew = () => PathTo.categoryNew;
  static toCategoryEdit = (categoryId: string) => PathTo.categoryEdit.replace(ParamName.categoryId, categoryId);
  static toCategoryEditFeedback = (categoryId: string) => `${PathFinder.toCategoryEdit(categoryId)}?${SearchParamName.actionFeedback}`;

  static toSubCategoryNew = () => PathTo.subCategoryNew;
  static toSubCategoryEdit = (subCategoryId: string) => PathTo.subCategoryEdit.replace(ParamName.subCategoryId, subCategoryId);
  static toSubCategoryEditFeedback = (subCategoryId: string) => `${PathFinder.toSubCategoryEdit(subCategoryId)}?${SearchParamName.actionFeedback}`;

  static toProductNew = () => PathTo.productNew;
  static toProductEdit = (productId: string) => PathTo.productEdit.replace(ParamName.productId, productId);
  static toProductEditFeedback = (productId: string) => `${PathFinder.toProductEdit(productId)}?${SearchParamName.actionFeedback}`;

  static toImagePlaceholder = () => PathTo.imagePlaceholder;

  static toCaptcha = (captchaName: string, shouldReload?: boolean) =>
    shouldReload ? PathTo.captcha.replace(ParamName.captchaName, captchaName) + `?${Date.now()}` : PathTo.captcha.replace(ParamName.captchaName, captchaName);

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

  static schemaRefineImageUrl(inputUrl: string) {
    return PathFinder.isImageSrcParsable(inputUrl);
  }

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

    // Check to ensure that the remote hostname provided by the user is on our allowed list
    return REMOTE_HOSTNAMES.some((allowedHostname) => allowedHostname === parsedSrc.hostname);
  }
}
