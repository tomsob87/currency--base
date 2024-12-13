import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ResultBox from './ResultBox';
  describe('Component ResultBox', () => {
    //render test
    it('should render without crashing', () => {
        render(<ResultBox from="PLN" to="USD" amount={100} />);
    })

    //From PLN to USD test
    const testCasesFromPLN = [
        {from: 'PLN', to: 'USD', amount: 100, amountCalc: '$28.57'},
        {from: 'PLN', to: 'USD', amount: 20, amountCalc: '$5.71'},
        {from: 'PLN', to: 'USD', amount: 8, amountCalc: '$2.29'},
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

    //From USD to PLN test
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

    //From PLN to PLN test
    const testCasesFromPLNtoPLN = [
        {from: 'PLN', to: 'PLN', amount: 100},
        {from: 'PLN', to: 'PLN', amount: 28},
        {from: 'PLN', to: 'PLN', amount: 13},
    ]

    for (const testObj of testCasesFromPLNtoPLN) {
        it('should render proper info about conversion when PLN -> PLN', () => {

            //render component    
            render(<ResultBox from={testObj.from} to={testObj.to} amount={testObj.amount} />)

            //find main elem 
            const result = screen.getByTestId('result-box');    

            //declare expectedText
            const expectedText = `${testObj.from} ${Number(testObj.amount).toFixed(2)} = ${testObj.to} ${Number(testObj.amount).toFixed(2)}`           

            expect(result).toHaveTextContent(expectedText);
        })
    }

    //From USD to USD
    const testCasesFromUSDtoUSD = [
        {from: 'USD', to: 'USD', amount: 100},
        {from: 'USD', to: 'USD', amount: 28},
        {from: 'USD', to: 'USD', amount: 13},
        {from: 'USD', to: 'USD', amount: 222},
    ]

    for (const testObj of testCasesFromUSDtoUSD) {
        it('should render proper info about conversion when USD -> USD', () => {

            //render component    
            render(<ResultBox from={testObj.from} to={testObj.to} amount={testObj.amount} />)

            //find main elem 
            const result = screen.getByTestId('result-box');  
            
            //declare expectedText
            const expectedText = `$${Number(testObj.amount).toFixed(2)} = $${Number(testObj.amount).toFixed(2)}`  
            
            expect(result).toHaveTextContent(expectedText);            
        })
    }

    //Negative cases
    const negativeInputCases = [
        {from: 'PLN', to: 'USD', amount: -100},
        {from: 'USD', to: 'PLN', amount: -28},
        {from: 'PLN', to: 'PLN', amount: -13},
        {from: 'USD', to: 'USD', amount: -13},
    ]

    for(const testObj of negativeInputCases) {
        it('should render message when negative input', () => {

            render(<ResultBox from={testObj.from} to={testObj.to} amount={testObj.amount} />)
            
            const wrongValueResult = screen.getByTestId('wrong-value-result-box');  

            expect(wrongValueResult).toHaveTextContent('Wrong value...');
        })
    }

});