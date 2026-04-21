import { useContext, useMemo } from "react";
import { UserContext } from "../context/UserContext";

/**
 * Custom hook to check if the current user has specific permissions.
 * Supports checking for a single permission or multiple permissions (any or all).
 */
export const usePermissions = () => {
    const { permissions, userType } = useContext(UserContext);

    const isSuperUser = useMemo(() => {
        // Admin or superuser usually has all permissions (*)
        return userType === 'admin' || permissions.includes('*');
    }, [userType, permissions]);

    /**
     * Check if user has a specific permission code.
     * @param {string|string[]} codes - Single code or array of codes to check.
     * @param {string} mode - 'any' (default) or 'all'.
     * @returns {boolean}
     */
    const hasPermission = (codes, mode = 'any') => {
        if (isSuperUser) return true;
        if (!permissions || !Array.isArray(permissions)) return false;

        const checkCodes = Array.isArray(codes) ? codes : [codes];

        if (mode === 'all') {
            return checkCodes.every(code => permissions.includes(code));
        }

        return checkCodes.some(code => permissions.includes(code));
    };

    return {
        permissions,
        isSuperUser,
        hasPermission
    };
};

export default usePermissions;
