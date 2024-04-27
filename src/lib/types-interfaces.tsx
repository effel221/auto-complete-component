interface NativeNameInterface {
    ron: {
        common: string
        official: string
    }
}

interface NameInterface {
    common: string,
    nativeName: NativeNameInterface,
    official: string
}

export type CountriesNamesDataType = {
    name: NameInterface
}

export interface DropDownProps {
    countriesNamesData: CountriesNamesDataType[]
}
