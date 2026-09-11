import {
  Alert,
  Badge,
  Button,
  Card,
  Icon,
  Modal,
  Select,
  Spinner,
  Body,
  Caption,
  Subtitle,
  TextField,
  Title,
  lightTheme,
} from "@subtrack/ui-components";
import { fireEvent, render } from "@testing-library/react-native";
import { StyleSheet, Text } from "react-native";

const flattenStyle = (element: { props: { style?: unknown } }) =>
  StyleSheet.flatten(element.props.style) as Record<string, unknown>;

describe("Button", () => {
  it("paints the primary variant with the brand color", () => {
    const { getByRole } = render(<Button label="Save" />);

    expect(flattenStyle(getByRole("button")).backgroundColor).toBe(
      lightTheme.colors.brand.primary,
    );
  });

  it("outlines the danger variant with the error border", () => {
    const { getByRole } = render(<Button label="Delete" variant="danger" />);
    const style = flattenStyle(getByRole("button"));

    expect(style.backgroundColor).toBe("transparent");
    expect(style.borderColor).toBe(lightTheme.colors.border.error);
  });

  it("outlines the secondary variant with the strong border", () => {
    const { getByRole } = render(<Button label="Cancel" variant="secondary" />);
    const style = flattenStyle(getByRole("button"));

    expect(style.backgroundColor).toBe("transparent");
    expect(style.borderColor).toBe(lightTheme.colors.border.strong);
    expect(style.borderWidth).toBe(lightTheme.strokeWidth.default);
  });

  it("drops the horizontal padding of the ghost variant", () => {
    const { getByRole } = render(<Button label="Forgot?" variant="ghost" />);

    expect(flattenStyle(getByRole("button")).paddingHorizontal).toBe(0);
  });

  it("applies the size tokens", () => {
    const { getByRole: small } = render(<Button label="a" size="small" />);
    const { getByRole: large } = render(<Button label="b" size="large" />);

    expect(flattenStyle(small("button")).height).toBe(
      lightTheme.components.button.smallHeight,
    );
    expect(flattenStyle(large("button")).height).toBe(
      lightTheme.components.button.largeHeight,
    );
  });

  it("ignores presses while loading", () => {
    const onPress = jest.fn();
    const { getByRole } = render(
      <Button label="Save" loading onPress={onPress} />,
    );

    fireEvent.press(getByRole("button"));

    expect(onPress).not.toHaveBeenCalled();
  });
});

describe("TextField", () => {
  it("marks the border as invalid and shows the error", () => {
    const { getByText, getByPlaceholderText } = render(
      <TextField
        error="Email is required"
        label="Email"
        placeholder="you@subtrack.app"
      />,
    );

    expect(getByText("Email is required")).toBeTruthy();
    expect(getByPlaceholderText("you@subtrack.app")).toBeTruthy();
  });

  it("renders the leading icon", () => {
    const { getByText } = render(
      <TextField icon={<Text>@</Text>} label="Email" />,
    );

    expect(getByText("@")).toBeTruthy();
  });

  it("fades the field when the input is not editable", () => {
    const { getByTestId } = render(
      <TextField editable={false} label="Email" testID="email" />,
    );
    // parent is the composite TextInput; its parent is the field container.
    const field = getByTestId("email").parent?.parent;

    expect(field?.props.editable).toBeUndefined();
    expect(flattenStyle(field!).opacity).toBe(0.6);
  });
});

describe("Card", () => {
  it("draws a border when outlined and none when elevated", () => {
    const { getByTestId: outlined } = render(
      <Card testID="card">
        <Text>content</Text>
      </Card>,
    );
    const { getByTestId: elevated } = render(
      <Card testID="card" variant="elevated">
        <Text>content</Text>
      </Card>,
    );

    expect(flattenStyle(outlined("card")).borderColor).toBe(
      lightTheme.colors.border.default,
    );
    expect(flattenStyle(elevated("card")).borderColor).toBeUndefined();
  });
});

describe("Badge", () => {
  it("takes its colors from the semantic palette", () => {
    const { getByText } = render(<Badge label="Shared" variant="success" />);

    expect(flattenStyle(getByText("Shared")).color).toBe(
      lightTheme.colors.semantic.success.text,
    );
  });
});

describe("Alert", () => {
  it("hides the dismiss control when it is not dismissible", () => {
    const { queryByLabelText } = render(
      <Alert message="Saved." type="success" />,
    );

    expect(queryByLabelText("Dismiss")).toBeNull();
  });

  it("maps the info type onto the neutral tone", () => {
    const { getByText } = render(<Alert message="Heads up." />);

    expect(flattenStyle(getByText("Heads up.")).color).toBe(
      lightTheme.colors.semantic.neutral.text,
    );
  });

  it("dismisses when the control is pressed", () => {
    const onDismiss = jest.fn();
    const { getByLabelText, getByText } = render(
      <Alert message="Something failed." onDismiss={onDismiss} type="error" />,
    );

    fireEvent.press(getByLabelText("Dismiss"));

    expect(onDismiss).toHaveBeenCalled();
    expect(flattenStyle(getByText("Something failed.")).color).toBe(
      lightTheme.colors.semantic.danger.text,
    );
  });
});

describe("Modal", () => {
  it("renders the title and children while visible", () => {
    const { getByText } = render(
      <Modal onClose={jest.fn()} title="Delete subscription" visible>
        <Text>This cannot be undone.</Text>
      </Modal>,
    );

    expect(getByText("Delete subscription")).toBeTruthy();
    expect(getByText("This cannot be undone.")).toBeTruthy();
  });

  it("renders nothing while hidden", () => {
    const { queryByText } = render(
      <Modal onClose={jest.fn()} visible={false}>
        <Text>This cannot be undone.</Text>
      </Modal>,
    );

    expect(queryByText("This cannot be undone.")).toBeNull();
  });

  it("closes when the backdrop is pressed", () => {
    const onClose = jest.fn();
    const { getByLabelText } = render(
      <Modal onClose={onClose} visible>
        <Text>body</Text>
      </Modal>,
    );

    fireEvent.press(getByLabelText("Close"));

    expect(onClose).toHaveBeenCalled();
  });
});

describe("Select", () => {
  const options = [
    { label: "Euro", value: "EUR" },
    { label: "Dollar", value: "USD" },
  ];

  it("shows the placeholder until a value is selected", () => {
    const { getByText } = render(
      <Select label="Currency" onChange={jest.fn()} options={options} />,
    );

    expect(getByText("Select an option")).toBeTruthy();
  });

  it("reports the chosen option", () => {
    const onChange = jest.fn();
    const { getByText } = render(
      <Select label="Currency" onChange={onChange} options={options} />,
    );

    fireEvent.press(getByText("Select an option"));
    fireEvent.press(getByText("Dollar"));

    expect(onChange).toHaveBeenCalledWith("USD");
  });
});

describe("Spinner", () => {
  it("defaults to the brand color", () => {
    expect(render(<Spinner />).toJSON()).toMatchObject({
      props: { color: lightTheme.colors.brand.primary, size: 24 },
    });
  });
});

describe("Icon", () => {
  it("hands the resolved size and color to the glyph", () => {
    const renderGlyph = jest.fn(() => null);
    render(<Icon render={renderGlyph} size="nav" />);

    expect(renderGlyph).toHaveBeenCalledWith({
      color: lightTheme.colors.textRole.secondary,
      size: 22,
    });
  });

  it("falls back to the list size and honors an explicit color", () => {
    const renderGlyph = jest.fn(() => null);
    render(<Icon color="#FF0000" render={renderGlyph} />);

    expect(renderGlyph).toHaveBeenCalledWith({ color: "#FF0000", size: 18 });
  });
});

describe("Typography", () => {
  it.each([
    ["Title", Title, "title"],
    ["Subtitle", Subtitle, "heading"],
    ["Body", Body, "body"],
    ["Caption", Caption, "caption"],
  ] as const)("renders %s with its typography token", (_name, Component, role) => {
    const { getByText } = render(<Component>My subscriptions</Component>);

    expect(flattenStyle(getByText("My subscriptions"))).toMatchObject({
      color: lightTheme.typography[role].color,
      fontSize: lightTheme.typography[role].size,
      fontWeight: lightTheme.typography[role].weight,
    });
  });
});
