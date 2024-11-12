// testing library
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

// components
import ConfirmDialog from "./ConfirmDialog";

const setup = async () => {
  const handleConfirmed = jest.fn();
  render(<ConfirmDialog onConfirmed={handleConfirmed}>Content</ConfirmDialog>);

  return {
    handleConfirmed,
    titleBar: await screen.findByTestId("titleBar"),
    confirmButton: await screen.findByTestId("confirmButton"),
    cancelButton: await screen.findByTestId("cancelButton"),
  };
};

describe("ConfirmDialog", () => {
  describe("Rendering", () => {
    it("renders a title bar", async () => {
      const { titleBar } = await setup();
      expect(titleBar).toBeInTheDocument();
    });

    it("title bar must use <h2> element", async () => {
      const { titleBar } = await setup();
      expect(titleBar.tagName).toBe("H2");
    });

    it("should have a confirm button", async () => {
      const { confirmButton } = await setup();
      expect(confirmButton).toBeInTheDocument();
    });

    it("should have a cancel button", async () => {
      const { cancelButton } = await setup();
      expect(cancelButton).toBeInTheDocument();
    });
  });

  describe("Interaction", () => {
    it("clicking the confirm button triggers an action", async () => {
      const { confirmButton, handleConfirmed } = await setup();
      await userEvent.click(confirmButton);
      expect(handleConfirmed).toHaveBeenCalledTimes(1);
    });
  });
});
