import axios from "axios";
import React, { useRef, useState } from "react";

import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useCreateProductMutation } from "../store/productApiSlice";
import PreviewImage from "./PreviewImage";

const SUPPORTED_FORMATS = [
  "image/jpg",
  "image/png",
  "image/jpeg",
  "image/webp",
];

const CreateProduct = () => {
  const [imgUrl, setImageUrl] = useState([]);
  const imgRef = useRef("");
  const imgRef1 = useRef("");
  const imgRef2 = useRef("");
  console.log(imgUrl);
  const [AddProduct] = useCreateProductMutation();
  const defaultValues = {
    productName: "",
    brand: "",
    deliveryInformation: "",
    productDescription: "",
    quantity: "",
    category: "select-one",
    price: "",
    file1: "",
    file2: "",
    file3: "",
  };
  const validationSchema = Yup.object({
    productName: Yup.string()
      .max(100, "Must be 100 characters or less")
      .required("Required"),
    brand: Yup.string()
      .max(15, "Must be 15 characters or less")
      .required("Required"),
    deliveryInformation: Yup.string()
      .max(100, "Must be 100 characters or less")
      .required("Required"),
    productDescription: Yup.string()
      .max(500, "Must be 500 characters or less")
      .required("Required"),
    quantity: Yup.string()
      .typeError("must be a number")
      .max(5, "Must be 10 characters or less")

      .test("type", "must be a number", (value) => typeof value !== Number)
      // .typeError("The value must be a number")
      // .min(2, "Must be 2 characters or more")
      // .max(5, "Must be 5 characters or less")

      .required("Required"),
    category: Yup.string().required("Required"),
    price: Yup.string()
      .max(10, "Must be 10 characters or less")

      .required("Required"),
    file1: Yup.mixed()
      .nullable()
      .required("Required")
      .test(
        "size",
        "File size is too big",
        (value) => !value || (value && value.size <= 1024 * 1024) // 5MB
      )
      .test(
        "type",
        "Invalid file format selection",
        (value) =>
          // console.log(value);
          !value || (value && SUPPORTED_FORMATS.includes(value?.type))
      ),
    file2: Yup.mixed()
      .nullable()
      .required("Required")
      .test(
        "size",
        "File size is too big",
        (value) => !value || (value && value.size <= 1024 * 1024) // 5MB
      )
      .test(
        "type",
        "Invalid file format selection",
        (value) =>
          // console.log(value);
          !value || (value && SUPPORTED_FORMATS.includes(value?.type))
      ),
    file3: Yup.mixed()
      .nullable()
      .required("Required")
      .test(
        "size",
        "File size is too big",
        (value) => !value || (value && value.size <= 1024 * 1024) // 5MB
      )
      .test(
        "type",
        "Invalid file format selection",
        (value) =>
          // console.log(value);
          !value || (value && SUPPORTED_FORMATS.includes(value?.type))
      ),
  });
  //   for ( let val in  value ​​) {
  //    data.append (val, value ​​[ val])x
  //  }
  // console.log([...imgUrl]);
  // [...imgUrl].forEach((file) => formData.append(file.name, file));
  // formData.append("files", { ...imgUrl[0] });
  // // e.preventDefault();
  // console.log(value.file1);
  const addProductHandler = async (value) => {
    // let Form = document.getElementById("Form");
    console.log(value);
    console.log(imgUrl);
    // // let fileArray = value.files;
    const formData = new FormData();
    formData.append("files", value.file1);
    formData.append("files", value.file2);
    formData.append("files", value.file3);
    formData.append("description", value.productDescription);
    formData.append("productName", value.productName);
    formData.append("brand", value.brand);
    formData.append("deliveryInformation", value.deliveryInformation);
    formData.append("quantity", value.quantity);
    formData.append("category", value.category);
    formData.append("price", value.price);
    // console.log(value.file1);
    // console.log(imgUrl);
    // formData.append("files", { ...imgUrl });
    console.log(...formData.entries());
    try {
      const result = await axios.post("/api/product/create", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log(result.data);
      // const res = await AddProduct({
      //   // productName: value.productName,
      //   // brand: value.brand,
      //   // deliveryInfo: value.deliveryInformation,
      //   // quantity: value.quantity,
      //   // category: value.category,
      //   // price: value.price,
      //   files: { ...formData },
      // }).unwrap();
      console.log({ ...res });
    } catch (error) {
      console.log(error.data || error);
    }
  };
  return (
    <div className="container">
      {/* style={{ width: "rem" }} */}
      <div class="card text-bg-light mb-3">
        <div class="card-header">Header</div>
        <div class="card-body">
          <h5 class="card-title">Light card title</h5>
          <Formik
            initialValues={defaultValues}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              // const actualData = JSON.parse(values);
              addProductHandler(values);
              // alert(JSON.stringify(values, null, 2));
            }}
          >
            {({ values, setFieldValue }) => (
              <Form class="row g-3" id="Form" encType="multipart/form-data">
                <div class="col-md-6">
                  <label for="inputEmail4" class="form-label">
                    Product Name
                  </label>
                  <Field
                    name="productName"
                    type="text"
                    class="form-control"
                    id="inputEmail4"
                  />
                  <ErrorMessage name="productName" />
                </div>
                <div class="col-md-6">
                  <label for="inputPassword4" class="form-label">
                    Brand
                  </label>
                  <Field
                    name="brand"
                    type="text"
                    class="form-control"
                    id="inputPassword4"
                  />
                  <ErrorMessage name="brand" />
                </div>
                <div class="col-12">
                  <label for="inputAddress" class="form-label">
                    Delivery Information
                  </label>
                  <Field
                    name="deliveryInformation"
                    type="text"
                    class="form-control"
                    id="inputAddress"
                    placeholder="1234 Main St"
                  />
                  <ErrorMessage name="deliveryInformation" />
                </div>
                <div class="col-12">
                  <label for="inputAddress" class="form-label">
                    Product Description
                  </label>
                  <Field
                    name="productDescription"
                    type="textarea"
                    class="form-control"
                    id="inputAddress"
                    placeholder="1234 Main St"
                  />
                  <ErrorMessage name="productDescription" />
                </div>
                <div class="col-md-6">
                  <label for="inputCity" class="form-label">
                    Quantity
                  </label>
                  <Field
                    name="quantity"
                    type="number"
                    class="form-control"
                    id="inputCity"
                  />
                  <ErrorMessage name="quantity" />
                </div>
                <div class="col-md-4">
                  <label for="inputState" class="form-label">
                    Category
                  </label>
                  <Field
                    name="category"
                    as="select"
                    id="inputState"
                    class="form-select"
                  >
                    <option selected>Select Category</option>
                    <option>Mens Apparrel</option>
                    <option>Womens Apparrel</option>
                    <option>Kids Apparrel</option>
                  </Field>
                  <ErrorMessage name="category" />
                </div>
                <div class="col-md-2">
                  <label for="inputZip" class="form-label">
                    Price
                  </label>
                  <Field
                    name="price"
                    type="number"
                    class="form-control"
                    id="inputZip"
                  />
                  <ErrorMessage name="price" />
                </div>

                <div class="col-12">
                  <div class="row row-cols-1 row-cols-md-3 g-4">
                    <div class="col-12 w-100 mt-3">
                      <h5>*only jpg , jpeg and png supported</h5>
                    </div>
                    <div class="col">
                      <div class="card">
                        <input
                          ref={imgRef}
                          type="file"
                          class="form-control"
                          onChange={(e) => {
                            setFieldValue("file1", e.target.files[0]);

                            console.log(e.target.files);
                          }}
                        />

                        {values.file1 ? (
                          <PreviewImage file={values.file1} />
                        ) : (
                          <img
                            src="public/placehold.jpg"
                            class="card-img-top rounded "
                          />
                        )}

                        <div class="card-body">
                          <p class="card-text">Place Thumbnail Here</p>
                        </div>
                        <ErrorMessage name="file1" />
                      </div>
                    </div>
                    <div class="col">
                      <div class="card">
                        <input
                          ref={imgRef1}
                          type="file"
                          name="image"
                          accept="image/*"
                          class="form-control"
                          onChange={(e) => {
                            setFieldValue("file2", e.target.files[0]);
                            console.log(e.target.files);
                          }}
                        />

                        {values.file2 ? (
                          <PreviewImage file={values.file2} />
                        ) : (
                          <img
                            src="public/placehold.jpg"
                            class="card-img-top rounded "
                          />
                        )}

                        <div class="card-body">
                          <p class="card-text">Place Thumbnail Here</p>
                        </div>
                        <ErrorMessage name="file2" />
                      </div>
                    </div>

                    <div class="col">
                      <div class="card">
                        <input
                          ref={imgRef2}
                          type="file"
                          name="image"
                          accept="image/*"
                          class="form-control"
                          onChange={(e) => {
                            setFieldValue("file3", e.target.files[0]);
                            console.log(e.target.files[0]);
                          }}
                        />

                        {values.file3 ? (
                          <PreviewImage file={values.file3} />
                        ) : (
                          <img
                            src="public/placehold.jpg"
                            class="card-img-top rounded "
                          />
                        )}

                        <div class="card-body">
                          <p class="card-text">Place Thumbnail Here</p>
                        </div>
                        <ErrorMessage name="file3" />
                      </div>
                    </div>
                  </div>
                </div>
                <button type="submit" class="btn btn-primary">
                  Add Product
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default CreateProduct;
