'use strict';

class helper {

    isValidCnpj(strCnpj) {
        let numbers, digits, sum, i, result, pos, size, eq_digits;
        eq_digits = 1
        strCnpj = strCnpj.replace(/\./g, '').replace('/', '').replace('-', '');

        if (strCnpj.length < 14)
            return false;
        for (i = 0; i < strCnpj.length - 1; i++)
            if (strCnpj.charAt(i) != strCnpj.charAt(i + 1)) {
                eq_digits = 0;
                break;
            }
        if (!eq_digits) {
            size = strCnpj.length - 2;
            numbers = strCnpj.substring(0, size);
            digits = strCnpj.substring(size);
            sum = 0;
            pos = size - 7;
            for (i = size; i >= 1; i--) {
                sum += numbers.charAt(size - i) * pos--;
                if (pos < 2)
                    pos = 9;
            }
            result = sum % 11 < 2 ? 0 : 11 - sum % 11;
            if (result != digits.charAt(0))
                return false;
            size = size + 1;
            numbers = strCnpj.substring(0, size);
            sum = 0;
            pos = size - 7;
            for (i = size; i >= 1; i--) {
                sum += numbers.charAt(size - i) * pos--;
                if (pos < 2)
                    pos = 9;
            }
            result = sum % 11 < 2 ? 0 : 11 - sum % 11;
            if (result != digits.charAt(1))
                return false;
            return true;
        }
        else
            return false;
    }

    paging(page_size, page) {
        const paging = {};

        if (page_size)
            paging.page_size = Number(page_size) || 10;
        if (page)
            paging.page = Number(page);

        return paging;
    }

    dynamici18nString(message) {
        if (message && typeof(message) == 'string')
            return message.search(/[a-z]\.[a-z]/i) >= 0 ? i18n.__(message) : message;

        return '';
    }
}

module.exports = new helper();
