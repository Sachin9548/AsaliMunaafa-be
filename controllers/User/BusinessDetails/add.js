const BusinessDetails = require("../../../models/businessDetails");
const Response = require("../../../helpers/response");
const { STATUS_CODE, ERROR_MSGS, INFO_MSGS } = require("../../../helpers/constant");
const { handleException } = require("../../../helpers/exception");

const add = async (req, res) => {
  const { logger } = req;
  try {
    // Log the complete request body for debugging

    // Extract userId and payload (assumed attached by middleware)
    const { userId, body } = req;

    if (!userId || !body) {
      return Response.error({
        req,
        res,
        status: STATUS_CODE.BAD_REQUEST,
        msg: ERROR_MSGS.MISSING_REQUIRED_FIELDS,
      });
    }

    // Convert frontend product keys to match backend schema
    if (body.products && Array.isArray(body.products)) {
      const formattedProducts = body.products.map((product) => {
        const productId = product.id || product.productId;
        const productName = product.title || product.productName;
        const productPrice =
          (product.variants && product.variants[0] && product.variants[0].price) ||
          product.productPrice;
        const manufacturingCost = product.manufacturingCost;

        // Check if any required field is missing or empty (allow 0 as a valid cost)
        if (
          productId == null ||
          productName == null ||
          productPrice == null ||
          manufacturingCost === undefined ||
          manufacturingCost === ""
        ) {
          throw new Error(ERROR_MSGS.INVALID_PRODUCT_DATA);
        }

        return {
          productId,
          productName,
          productPrice,
          manufacturingCost,
        };
      });
      body.products = formattedProducts;
    }

    // Try to find an existing document for the user
    let existingData = await BusinessDetails.findOne({ userId });

    let result;

    if (existingData) {
      // If updating, merge the products array:
      if (body.products && Array.isArray(body.products)) {
        const updatedProducts = body.products.map((newProduct) => {
          // Find the matching existing product by productId
          const existingProduct = existingData.products.find(
            (p) => p.productId === newProduct.productId
          );
          return {
            ...(existingProduct || {}), // Preserve existing values if available
            ...newProduct, // Overwrite with new data
          };
        });
        body.products = updatedProducts;
      }

      // Merge all incoming fields with the existing document
      const updatedData = {
        ...existingData.toObject(),
        ...body,
      };


      result = await BusinessDetails.findByIdAndUpdate(existingData._id, updatedData, {
        new: true,
      });
    } else {
      // No existing document: create a new one
      result = await BusinessDetails.create({ userId, ...body });
    }

    const statusCode = result ? STATUS_CODE.OK : STATUS_CODE.BAD_REQUEST;
    const message = result
      ? existingData
        ? INFO_MSGS.UPDATED_SUCCESSFULLY
        : INFO_MSGS.CREATED_SUCCESSFULLY
      : ERROR_MSGS[existingData ? "UPDATE_ERR" : "CREATE_ERR"];


    return Response[result ? "success" : "error"]({
      req,
      res,
      status: statusCode,
      msg: message,
      data: result || null,
    });
  } catch (error) {
    return handleException(logger, res, error);
  }
};

module.exports = {
  add,
};
