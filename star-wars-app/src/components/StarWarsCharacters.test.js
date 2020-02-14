import React from 'react';
import * as rtl from "@testing-library/react";
import { getData } from "../api";
import StarWarsCharacters from "./StarWarsCharacters";

jest.mock("../api");

test("renders characters", async () => {
    getData.mockResolvedValueOnce({ results: [{ name: "Luke Skywalker" }] })
    rtl.render(<StarWarsCharacters />)
    expect(getData).toHaveBeenCalled();
})

test("next and previous buttons working", async () => {
    getData.mockResolvedValueOnce({ results: [{ name: "Luke Skywalker" }] })
    const { getByText } = rtl.render(<StarWarsCharacters />)

    const next = getByText(/next/i);
    const prev = getByText(/previous/i)

    rtl.act(() => {
        rtl.fireEvent.click(next);
        rtl.fireEvent.click(prev);
    })

    expect(getData).toHaveBeenCalled();
})