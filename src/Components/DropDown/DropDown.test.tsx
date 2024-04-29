import React from 'react';
import {render, screen, fireEvent, waitFor} from '@testing-library/react';
import DropDown from "./index";


describe('test DropDown component',  () => {
    const countriesNamesDataMock = [{
        name:{
            common: "Moldova",
            nativeName: null,
            official: "Moldova"
        }
    }]
    test('render empty DropDown component if showDropDown false', async () => {
        const { container } = render(<DropDown
            countriesNamesData={[]}
            setCountriesNamesInputValue={jest.fn(x => x)}
            countriesNamesInputValue={'test'}
            showDropDown={false}
            setShowDropDown={jest.fn(x => x)}
        />);
        expect(container).toBeEmptyDOMElement();
    });

    test('render DropDown component with one item', async () => {
        const { container } = render(<DropDown
            countriesNamesData={countriesNamesDataMock}
            setCountriesNamesInputValue={jest.fn(x => x)}
            countriesNamesInputValue={'test'}
            showDropDown={true}
            setShowDropDown={jest.fn(x => x)}
        />);
        const list = screen.getByRole('list') as HTMLUListElement;
        const items = screen.getAllByRole("listitem")
        expect(items.length).toBe(1)
    });

    test('render DropDown with item, marked with countriesNamesInputValue fragment', async () => {
        const { container } = render(<DropDown
            countriesNamesData={countriesNamesDataMock}
            setCountriesNamesInputValue={jest.fn(x => x)}
            countriesNamesInputValue={'Mol'}
            showDropDown={true}
            setShowDropDown={jest.fn(x => x)}
        />);
        const list = screen.getByRole('list') as HTMLUListElement;
        const item = screen.getAllByRole("listitem")[0]
        expect(item).toContainHTML('<li><mark>Mol</mark>dova</li>')
    });

    test('render DropDown with placeholder for no item founded text', async () => {
        const { container } = render(<DropDown
            countriesNamesData={{
                status: 404,
                message: "test"
            }}
            setCountriesNamesInputValue={jest.fn(x => x)}
            countriesNamesInputValue={'Mol'}
            showDropDown={true}
            setShowDropDown={jest.fn(x => x)}
        />);
        const list = screen.getByRole('list') as HTMLUListElement;
        const item = screen.getAllByRole("listitem")[0]
        expect(item).toHaveTextContent('No results were founded...')
    });

    test('render DropDown with click on li element', async () => {
        const setCountriesNamesInputValue = jest.fn(x => x)
        const setShowDropDown = jest.fn(x => x)
        const { container } = render(<DropDown
            countriesNamesData={countriesNamesDataMock}
            setCountriesNamesInputValue={setCountriesNamesInputValue}
            countriesNamesInputValue={'Mol'}
            showDropDown={true}
            setShowDropDown={setShowDropDown}
        />);
        const list = screen.getByRole('list') as HTMLUListElement;
        const item = screen.getAllByRole("listitem")[0]
        fireEvent.click(item);
        expect(setCountriesNamesInputValue.mock.calls).toHaveLength(1);
        expect(setShowDropDown.mock.calls).toHaveLength(1);
    });
})
