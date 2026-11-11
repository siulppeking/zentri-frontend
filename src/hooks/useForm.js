import { useState } from 'react';
import { useZodValidation } from './useZodValidation';

export const useForm = (initialValues, schema) => {
    const [formValues, setFormValues] = useState(initialValues);

    const { errors, validate, clearError, setErrors } = useZodValidation(schema);

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setFormValues(prev => ({
            ...prev,
            [name]: value
        }));

        clearError(name);
    };

    const resetForm = () => {
        setFormValues(initialValues);
        setErrors({});
    };

    return {
        formValues,
        errors,
        handleInputChange,
        isFormValid: validate,
        resetForm
    };
};