import { render } from "@testing-library/react";
import { screen } from "@testing-library/dom";
import { MockedProvider } from "@apollo/client/testing";
import { App } from "./App";

describe("Simple working test", () => {
  it("renders the app with the correct title", () => {
    render(
      <MockedProvider>
        <App />
      </MockedProvider>
    );
    const titleElement = screen.getByText(/Bol Multi-Select Filter/i);
    expect(titleElement).toBeInTheDocument();
  });
});
