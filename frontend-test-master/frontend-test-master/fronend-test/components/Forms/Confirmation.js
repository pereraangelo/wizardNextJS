import styles from "../../styles/styles.module.scss";
import { useFormData } from "../../context";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Confirmation(props) {
  const { formStep, prevFormStep } = props;

  const { data } = useFormData();
  const router = useRouter();

  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const res = await fetch("/api/profiles", {
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });

    const result = await res.json();

    if (res.status === 201) {
      router.reload("/");
    } else {
      setError("Something went wrong.Please try again");
    }
  };

  return (
    <div className={formStep === 2 ? styles.showForm : styles.hideForm}>
      <h2>Confirmation</h2>

      <form>
        <div className={styles.formRow}>
          <label>
            First name <span className={styles.cDataName}>{data.firstName}</span>
          </label>
        </div>
        <div className={styles.formRow}>
          <label>
            Last name <span className={styles.cDataName}>{data.lastName}</span>
          </label>
        </div>{" "}
        <div className={styles.formRow}>
          <label>
            Email <span className={styles.cDataEmail}>{data.email}</span>
          </label>
        </div>
        <div className={styles.buttonSection}>
          <button type="button" onClick={handleSubmit}>
            Submit
          </button>
          <button type="button" onClick={prevFormStep} className={styles.back}>
            back
          </button>
        </div>
        <div>{error && <span className={styles.error}>{error}</span>}</div>
      </form>
    </div>
  );
}
