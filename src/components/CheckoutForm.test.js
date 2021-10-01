import React from "react";
import MutationObserver from 'mutationobserver-shim';
import { render, screen, waitFor } from "@testing-library/react";
import CheckoutForm from './CheckoutForm';
import PlantList from "./PlantList";
import userEvent from '@testing-library/user-event';

// Write up the two tests here and make sure they are testing what the title shows

test("renders without errors", () => {
    render(<CheckoutForm />);
});

test("shows success message on submit along with form details", async () => {
    render(<CheckoutForm />)
    const firstName = screen.getByLabelText(/First Name:/i);
    const lastName = screen.getByLabelText(/Last Name:/i);
    const address = screen.getByLabelText(/Address:/i);
    const city = screen.getByLabelText(/City:/i);
    const state = screen.getByLabelText(/State:/i);
    const zip = screen.getByLabelText(/Zip:/i);
    
    userEvent.type(firstName, 'John');
    userEvent.type(lastName, 'Barnett');
    userEvent.type(address, '876 wonkey Ave');
    userEvent.type(city, 'Houston');
    userEvent.type(state, 'Tx');
    userEvent.type(zip, '76251');

    const button = await screen.getByRole('button');
    userEvent.click(button);

    console.log(address)

    await waitFor(() => {
        const message = screen.getByTestId('successMessage');
        const firstNameDisplay = screen.queryByText(/John/i);
        const lastNameDisplay = screen.queryByText(/Barnett/i);
        const addressDisplay = screen.queryByText('876 wonkey Ave');
        const cityDisplay = screen.queryByText(/Houston/i);
        const stateDisplay = screen.queryByText(/Tx/i);
        const zipDisplay = screen.queryByText(/76251/i);

        expect(message).toHaveTextContent(/You have ordered some plants! Woo-hoo!/i);
        expect(firstNameDisplay).toBeInTheDocument();
        expect(lastNameDisplay).toBeInTheDocument();
        expect(addressDisplay).toBeInTheDocument();
        expect(cityDisplay).toBeInTheDocument();
        expect(stateDisplay).toBeInTheDocument();
        expect(zipDisplay).toBeInTheDocument();
    });
});

