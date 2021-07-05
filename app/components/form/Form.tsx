import React, { ReactElement, ReactNode, RefAttributes } from "react";
import { Control, FieldError } from "react-hook-form";
import { TextStyle } from "react-native";

export interface ControlProps {
  control?: Control<any>;
  name: string;
  label?: string;
  labelStyle?: TextStyle;
  rules?: any;
  error?: FieldError | undefined;
  editable?: boolean;
}

interface Props {
  children: ReactNode;
  control: Control<any>;
  rules: any;
  errors: any;
  editable?: boolean;
  onSubmit?: () => void;
}

// TODO: auto focus on next input field?
const Form = ({ children, control, rules, errors, editable = true, onSubmit }: Props) => {
  const enrichElements = (elements: ReactNode): ReactElement[] | undefined => {
    if (!elements) return undefined;

    return (Array.isArray(elements) ? [...elements] : [elements]).map((element, i) => enrichElement(element as ReactElement, i));
  };

  const enrichElement = (element: ReactElement & RefAttributes<any>, index: number): ReactElement => {
    if (!element.props) return element;

    let props = {
      ...element.props,
      children: enrichElements(element.props.children),
      key: index,
    };

    if (element.props.name) {
      props = {
        ...props,
        ref: element.ref,
        control: control,
        rules: rules[element.props.name],
        error: errors[element.props.name],
        editable: editable,
        onSubmit: onSubmit,
      };
    }

    return React.createElement(element.type, props);
  };

  return <>{enrichElements(children)}</>;
};

export default Form;
