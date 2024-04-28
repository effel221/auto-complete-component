import {Dispatch, SetStateAction} from "react";

interface NativeNameInterface {
    ron: {
        common: string
        official: string
    }
}

export interface NameInterface {
    common: string,
    nativeName: NativeNameInterface,
    official: string
}

export type CountriesNamesDataType = {
    name: NameInterface
}

type errorStatusType = {
  status: number,
  message: string
}

export type CountriesNamesDataTypes =
    | CountriesNamesDataType[]
    | errorStatusType;

export interface DropDownProps {
    countriesNamesData: CountriesNamesDataTypes,
    setCountriesNamesInputValue: Dispatch<SetStateAction<string>>,
    countriesNamesInputValue: string,
    showDropDown: boolean,
    setShowDropDown: Dispatch<SetStateAction<boolean>>
}
