// types
enum ParamName {
  brandId = "[brandId]",
  brandName = "[brandName]",
  categoryId = "[categoryId]",
  categoryName = "[categoryName]",
  subCategoryId = "[subCategoryId]",
  subCategoryName = "[subCategoryName]",
  productId = "[productId]",
  productName = "[productName]",
  captchaName = "[name]",
  orderId = "[orderId]",
}

enum SearchParamName {
  categoryId = "mcat",
  subCategoryId = "scat",
  actionFeedback = "afeed",
}

enum PathTo {
  storeFront = "",
  sfAllProducts = storeFront + "/products",
  sfProductsSearch = storeFront + "/search",
  sfProductsBrand = storeFront + "/brand",
  sfProductsByBrand = sfProductsBrand + `/${ParamName.brandName}/${ParamName.brandId}`,
  sfProductsByCategory = sfAllProducts + `/${ParamName.categoryName}/${ParamName.categoryId}`,
  sfProductsByCategoryAndSubCategory = sfProductsByCategory + `/${ParamName.subCategoryName}/${ParamName.subCategoryId}`,
  sfProductDetails = storeFront + `/${ParamName.productName}/${ParamName.productId}`,

  sfCart = storeFront + "/cart",

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

  orders = manager + "/orders",
  orderView = orders + `/${ParamName.orderId}`,

  productImages = "/product-images",
  brandLogos = "/brand-logos",
  imagePlaceholder = "/image.svg",

  captcha = "/auth/captcha" + `/${ParamName.captchaName}`,
}

const REMOTE_HOSTNAMES = ["images.unsplash.com", "plus.unsplash.com"];

export default class PathFinder {
  static toSfAllProducts = () => PathTo.sfAllProducts;
  static toSfProductsSearch = () => PathTo.sfProductsSearch;
  static toSfProductsBrand = () => PathTo.sfProductsBrand;

  static toSfProductsByBrand = (brandName: string, brandId: string) =>
    // Incorporate the brand name in the url to make it search-engine-friendly
    PathTo.sfProductsByBrand.replace(ParamName.brandName, encodeURIComponent(brandName)).replace(ParamName.brandId, brandId);

  static toSfProductsByCategory = (categoryName: string, categoryId: string) =>
    // Incorporate the category name in the url to make it search-engine-friendly
    PathTo.sfProductsByCategory.replace(ParamName.categoryName, encodeURIComponent(categoryName)).replace(ParamName.categoryId, categoryId);

  static toSfProductsByCategoryAndSubCategory = (categoryName: string, categoryId: string, subCategoryName: string, subCategoryId: string) =>
    // Incorporate both category and subcategory names in the url to make it search-engine-friendly
    PathTo.sfProductsByCategoryAndSubCategory
      .replace(ParamName.categoryName, encodeURIComponent(categoryName))
      .replace(ParamName.categoryId, categoryId)
      .replace(ParamName.subCategoryName, encodeURIComponent(subCategoryName))
      .replace(ParamName.subCategoryId, subCategoryId);

  static toSfProductDetails = (productName: string, productId: string) =>
    // Incorporate the product name in the url to make it search-engine-friendly
    PathTo.sfProductDetails.replace(ParamName.productName, encodeURIComponent(productName)).replace(ParamName.productId, productId);
  static toSfProductDetailsReval = () => PathTo.sfProductDetails;

  static toSfCart = () => PathTo.sfCart;
  static toSfCartReval = () => PathTo.sfCart;

  // Are we displaying a bunch of products?
  static isBunchOfProducts = (pathname: string) =>
    [PathTo.sfAllProducts, PathTo.sfProductsSearch, PathTo.sfProductsBrand].some((path) => pathname.startsWith(path));

  static toManagerLogin = () => PathTo.managerLogin;

  static toManagerHome = () => PathTo.manager;
  static toAllBrands = () => PathTo.brands;
  static toAllCategories = () => PathTo.categories;
  static toAllSubCategories = () => PathTo.subCategories;
  static toAllProducts = () => PathTo.products;
  static toAllCharts = () => PathTo.charts;
  static toAllOrders = () => PathTo.orders;

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

  static toOrderView = (orderId: string) => PathTo.orderView.replace(ParamName.orderId, orderId);
  static toOrderViewReval = () => PathTo.orderView;

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
