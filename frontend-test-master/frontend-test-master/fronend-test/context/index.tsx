import { useState, createContext, useContext } from "react";

interface IFormcontext {
  data: object;
  setFormValues?: (value: any) => void;
}

const defaultState = {
  data: { firstName: "", lastName: "", email: "" },
};

export const FormContext = createContext<IFormcontext>(defaultState);

export default function FormProvider({children}: {  children: React.ReactNode;}) {
  const [data, setData] = useState(defaultState.data);

  const setFormValues = (e: any) => {
    const name = e.target.name;
    const value = e.target.value;
    setData((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  return (
    <FormContext.Provider value={{ data, setFormValues }}>
      {children}
    </FormContext.Provider>
  );
}

export const useFormData = () => useContext(FormContext);
