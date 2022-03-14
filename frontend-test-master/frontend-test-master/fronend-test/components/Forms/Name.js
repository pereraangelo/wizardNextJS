import styles from "../../styles/styles.module.scss";
import { useFormData } from "../../context";
import { useEffect, useState } from "react";

export default function Name(props) {
  const { formStep, nextFormStep } = props;

  const { data, setFormValues } = useFormData();

  const [error, setError] = useState({
    efirstName: null,
    elastName: null,
  });

  //validaty check function
  const checkValidate = (e) => {
    let eKey = "e" + e.target.name;

    if (e.target.value.length === 0) {
      setError((prevValues) => ({
        ...prevValues,
        [eKey]: "This field is required.",
      }));
    } else if (e.target.value.length == 1) {
      setError((prevValues) => ({
        ...prevValues,
        [eKey]: "Minimum 2 characters are required.",
      }));
    } else {
      setError((prevValues) => ({
        ...prevValues,
        [eKey]: "",
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    nextFormStep();
  };

  return (
    <div className={formStep === 0 ? styles.showForm : styles.hideForm}>
      <form name="wizadForm" onSubmit={handleSubmit}>
        <div className={styles.formHeader}>Name</div>

        <div className={styles.formRow}>
          <input
            type="text"
            name="firstName"
            id="firstName"
            placeholder="First Name"
            value={data.firstName || ""}
            onChange={(e) => {
              setFormValues(e);
              checkValidate(e);
            }}
            className={error.efirstName && styles.errorInput}
          />
          {error.efirstName && (
            <span className={styles.error}>{error.efirstName}</span>
          )}
        </div>
        <div className={styles.formRow}>
          <input
            type="text"
            name="lastName"
            id="lastName"
            placeholder="Last Name"
            value={data.lastName || ""}
            onChange={(e) => {
              setFormValues(e);
              checkValidate(e);
            }}
            className={error.elastName && styles.errorInput}
          />
          {error.elastName && (
            <span className={styles.error}>{error.elastName}</span>
          )}
        </div>

        <div className={styles.buttonSection}>
          <button
            type="submit"
            disabled={
              error.efirstName === "" && error.elastName === "" ? false : true
            }
          >
            Next
          </button>
        </div>
      </form>
    </div>
  );
}
