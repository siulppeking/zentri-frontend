import { useState } from 'react';

export const useZodValidation = (schema) => {
    const [errors, setErrors] = useState({});

    const validate = (values) => {
        const result = schema.safeParse(values);

        if (!result.success) {
            const fieldErrors = {};

            result.error.issues.forEach(issue => {
                fieldErrors[issue.path[0]] = issue.message;
            });

            setErrors(fieldErrors);
            return false;
        }

        setErrors({});
        return true;
    };

    const clearError = (field) => {
        setErrors(prev => ({
            ...prev,
            [field]: ''
        }));
    };

    return {
        errors,
        validate,
        clearError,
        setErrors
    };
};