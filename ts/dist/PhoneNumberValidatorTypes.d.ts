export interface PhoneValidation {
    carrier?: string;
    country_code?: string;
    country_name?: string;
    country_prefix?: string;
    international_format?: string;
    line_type?: string;
    local_format?: string;
    number?: string;
    valid?: boolean;
}
export interface PhoneValidationLoadMatch {
    phone_number: string;
    country_code?: string;
}
