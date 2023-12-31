import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { categoryEdit, getCategoryId } from "../../../../redux/actions/actions";
import styles from "./EditCategory.module.css";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import validateForm from './validation';
import { useTranslation } from 'react-i18next';


export const EditCategory = ({ currentLanguage }) => {
  const { t } = useTranslation('global');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const { id } = params;

  const category = useSelector((state) => state.category);
  const [editCategory, setEditCategory] = useState({
    name: category.name,
    description: category.description,
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    dispatch(getCategoryId(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (category.name && category.description) {
      setEditCategory({
        name: category.name,
        description: category.description,
      });
    }
  }, [category.name, category.description]);

  const handleChange = (event) => {
    event.preventDefault();
    setEditCategory({
      ...editCategory,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // console.log(editCategory);

    const errors = validateForm (
      editCategory.name,
      editCategory.description
    );
    setErrors(errors);

    if (Object.keys(errors).length === 0) {
      dispatch(categoryEdit(id, editCategory));
      toast.success(t("edit-category.successfully", { lng: currentLanguage })); 
      setErrors({});
      navigate("/dashboard");
    } else {
       toast.error(t("edit-category.incompleted", { lng: currentLanguage }));
    }


    // dispatch(categoryEdit(id, editCategory));
    // toast.success("¡Updated successfully!");
    // navigate("/dashboard");
  };
  // console.log("Edit category: ", editCategory);
  return (
    <div>
      <div className={styles.container}>
        <form onSubmit={handleSubmit} className={styles.formContainer}>
          <h4 style={{ fontFamily: "Poppins", marginBottom: "1rem" }}>
          {t("edit-category.edit-category", { lng: currentLanguage })}
          </h4>
          {/* <label htmlFor="isActive">active</label>
        <input
        className='form-check-input mt-10'
        type="checkbox"
        name='isActive'
        id='isActive'
        value={category.isActive}
        onChange={handleChangeCheckBox}
        />
        <br /> */}

          {/* Nombre de categoria */}
          <input
            className="form-control mb-3 w-75"
            type="text"
            name="name"
            placeholder={t("edit-category.category-name", { lng: currentLanguage })}
            value={editCategory.name}
            onChange={handleChange}
          />
      {errors.name && (
        <p className={styles.error}>{errors.name}</p>
      )}
          {/* Descripcion de categoria */}
          <textarea
            type="textarea"
            name="description"
            className="form-control"
            style={{
              resize: "none",
              width: "75%",
              height: "30%",
              fontFamily: "Poppins",
            }}
            placeholder={t("edit-category.category-description", { lng: currentLanguage })}
            value={editCategory.description}
            onChange={handleChange}
          />
      {errors.description && (
        <p className={styles.error}>{errors.description}</p>
      )}
        <br />
          <button className={styles.create}>{t("edit-category.update", { lng: currentLanguage })}</button>
        </form>
      </div>
    </div>
  );
};
