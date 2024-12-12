import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ResultBox from './ResultBox';
  describe('Component ResultBox', () => {

    it('should render without crashing', () => {
        render(<ResultBox from="PLN" to="USD" amount={100} />);
    })

    const testCasesFromPLN = [
        {from: 'PLN', to: 'USD', amount: 100, amountCalc: '$28.57'},
        {from: 'PLN', to: 'USD', amount: 20, amountCalc: '$5.71'},
        {from: 'PLN', to: 'USD', amount: 8, amountCalc: '$2.29'},
        {from: 'PLN', to: 'USD', amount: 3206, amountCalc: '$916.00'},
    ]

    for (const testObj of testCasesFromPLN) {

        it('should render proper info about conversion when PLN -> USD', () => {

            //render component    
            render(<ResultBox from={testObj.from} to={testObj.to} amount={testObj.amount} />)

            //find main elem
            const result = screen.getByTestId('result-box');
            
            //declare expectedText
            const expectedText = `${testObj.from} ${Number(testObj.amount).toFixed(2)} = ${testObj.amountCalc}`

            expect(result).toHaveTextContent(expectedText);
        })
    };

    const testCasesFromUSD = [
        {from: 'USD', to: 'PLN', amount: 100, amountCalc: 'PLN 350.00'},
        {from: 'USD', to: 'PLN', amount: 12, amountCalc: 'PLN 42.00'},
        {from: 'USD', to: 'PLN', amount: 59, amountCalc: 'PLN 206.50'},
        {from: 'USD', to: 'PLN', amount: 87, amountCalc: 'PLN 304.50'}
    ]

    for (const testObj of testCasesFromUSD){

        it('should render proper info about conversion when USD -> PLN', () => {

            //render component    
            render(<ResultBox from={testObj.from} to={testObj.to} amount={testObj.amount} />)

            //find main elem 
            const result = screen.getByTestId('result-box');

            //declare expectedText
            const expectedText = `$${Number(testObj.amount).toFixed(2)} = ${testObj.amountCalc}`

            expect(result).toHaveTextContent(expectedText);
        })
    }

});