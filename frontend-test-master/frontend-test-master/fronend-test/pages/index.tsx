import type { NextPage } from "next";
import { useState } from "react";
import Head from "next/head";

import styles from "../styles/styles.module.scss";
import FormCard from "../components/FormCard";

import { Email, Confirmation, Name } from "../components/Forms";

const Home: NextPage = () => {
  const [formStep, setFormStep] = useState(0);

  const nextFormStep = () => setFormStep((currentStep) => currentStep + 1);

  const prevFormStep = () => setFormStep((currentStep) => currentStep - 1);

  return (
    <div className={styles.container}>
      <Head>
        <title>Wizard</title>
      </Head>
      <FormCard currentStep={formStep} prevFormStep={prevFormStep}>
        {formStep >= 0 && (
          <Name
            formStep={formStep}
            nextFormStep={nextFormStep}
            prevFormStep={prevFormStep}
          />
        )}
        {formStep >= 1 && (
          <Email
            formStep={formStep}
            nextFormStep={nextFormStep}
            prevFormStep={prevFormStep}
          />
        )}
        {formStep >= 2 && (
          <Confirmation
            formStep={formStep}
            nextFormStep={nextFormStep}
            prevFormStep={prevFormStep}
          />
        )}
      </FormCard>
    </div>
  );
};

export default Home;
