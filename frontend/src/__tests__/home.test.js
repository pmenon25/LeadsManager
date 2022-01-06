import React from 'react';
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';

import AddLeads from '../components/AddLeads/AddLeads.jsx';
import AddPage from '../pages/AddPage/AddPage.jsx';
import App from '../App.js';


describe('Unit tests', () => {
    const URL_PREFIX = "http://localhost:8000";
    const handlers = [
        rest.get(`${URL_PREFIX}/lead/`, (req, res, ctx) => {
            return res(
                ctx.status(200),
                ctx.json(
                    [
                        { "id": 1, "firstname": "test1", "lastname": "m1", "email": "1@email.com", "notes": "fdsasdf", "created": "2022-01-05T23:12:20.307549Z", "updated": "2022-01-05T23:12:20.307596Z", "contacted": true },
                        { "id": 2, "firstname": "test2", "lastname": "m2", "email": "2@email.com", "notes": "testing", "created": "2022-01-06T00:22:14.634719Z", "updated": "2022-01-06T00:22:14.634797Z", "contacted": true },
                    ]
                )
            )
        }),

        rest.post(`${URL_PREFIX}/lead/add/`, (req, res, ctx) => {
            return res(
                ctx.status(400),
                ctx.json(
                    {
                        firstname: "Test error",
                        lastname: "Another error message"
                    }))
        })
    ]

    const server = setupServer(...handlers)

    beforeAll(() => server.listen())
    afterEach(() => server.resetHandlers())
    afterAll(() => server.close())

    test('Verify screen is rendered with empty form fields', () => {
        render(
            <AddPage></AddPage>
        )

        expect(screen.getByLabelText('First Name').value).toContain('')
        expect(screen.getByLabelText('Last Name').value).toContain('')
        expect(screen.getByLabelText('Email').value).toContain('')
        expect(screen.getByLabelText('Notes').value).toContain('')
    })

    test('Test home page contents', async () => {
        const { container, getByText } = render(
            <App></App>
        )

        // Confirm we're routed to the Home page
        expect(screen.getByRole('link', { name: 'Lead Management' }))

        // Confirm navbar entries
        expect(screen.getByRole('link', { name: 'Add Leads' }))

        // Confirm the fields displayed on the home page
        expect(screen.getByRole('columnheader', { name: 'First Name' }))
        expect(screen.getByRole('columnheader', { name: 'Last Name' }))
        expect(screen.getByRole('columnheader', { name: 'Email' }))
        expect(() => screen.getByRole('columnheader', { name: 'Notes' })).toThrow();
        expect(screen.getByRole('columnheader', { name: 'Contacted?' }))
        expect(screen.getByRole('columnheader', { name: 'Created On' }))

        await waitFor(() => {
            expect(getByText('2@email.com')).toBeInTheDocument()
        })
    })


    test('Checks event handlers are called when form is filled', () => {
        const handleSubmit = jest.fn();
        const handleChange = jest.fn();
        const handleClose = jest.fn();
        const DEFAULT_FORM_FIELDS = {
            firstname: "",
            lastname: "",
            email: "",
            notes: "",
            contacted: false
        }

        render(
            <AddLeads
                firstname={DEFAULT_FORM_FIELDS.firstname}
                lastname={DEFAULT_FORM_FIELDS.lastname}
                email={DEFAULT_FORM_FIELDS.email}
                notes={DEFAULT_FORM_FIELDS.notes}
                contacted={DEFAULT_FORM_FIELDS.contacted}
                modalShow={false}
                errorMessage=""
                handleSubmit={handleSubmit}
                handleChange={handleChange}
                handleClose={handleClose} />
        )

        fireEvent.change(screen.getByLabelText('First Name'), { target: { value: "Test Name" } })
        fireEvent.change(screen.getByLabelText('Last Name'), { target: { value: "Test Name" } })
        fireEvent.change(screen.getByLabelText('Email'), { target: { value: "test@email.com" } })
        fireEvent.change(screen.getByLabelText('Notes'), { target: { value: "Test Notes" } })

        // Now submit the form
        fireEvent.click(screen.getByRole('button'));

        expect(handleSubmit).toHaveBeenCalledTimes(1);
        expect(handleChange).toHaveBeenCalledTimes(4);
    })
});