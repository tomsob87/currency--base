import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CurrencyForm from './CurrencyForm';

describe('Component CurrencyForm', () => {

    it('should render without crashing', () => {
    render(<CurrencyForm action={() => {}} />);
    });

    const testCases = [
        { amount: '100', from: 'PLN', to: 'USD' },
        { amount: '20', from: 'USD', to: 'PLN' },
        { amount: '200', from: 'PLN', to: 'USD' },
        { amount: '345', from: 'USD', to: 'PLN' },
    ];

    for (const testObj of testCases) {
        it('should run action callback with proper data on form submit', () => {
            
            const action = jest.fn();

            //render component
            render(<CurrencyForm action={action} />);

            //find all elems
            const amountField = screen.getByTestId('amount');
            const fromField = screen.getByTestId('from-select');
            const toField = screen.getByTestId('to-select');
            const submitButton = screen.getByText('Convert');

            //set test values to fields
            userEvent.type(amountField, testObj.amount);
            userEvent.selectOptions(fromField, testObj.from);
            userEvent.selectOptions(toField, testObj.to);

            //simulate user click on "convert" button
            userEvent.click(submitButton);

            //check if action callback was called once
            expect(action).toHaveBeenCalledTimes(1);

            //check if action callback was called with proper data
            expect(action).toHaveBeenCalledWith({ amount: Number(testObj.amount), from: testObj.from, to: testObj.to });

            // unmount component
            cleanup()
        });
    }
});