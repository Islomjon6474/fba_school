import React, { ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import { tv, type VariantProps } from "tailwind-variants";
import cx from "classnames";

const button = tv({
  base: " flex justify-center h-full items-center flex-shrink-0 font-medium font-sans relative z-[1] cursor-pointer overflow-hidden rounded-lg",
  variants: {
    disabled: {
      true: "opacity-100 cursor-default pointer-events-none border !bg-black border-opacity-100",
    },
    variant: {
      primary: "!text-white !bg-[#FF6636]",
      outline: "!text-[#FF6636] !bg-[#FFEEE8]",
      dark: "!text-white !bg-[#292B31]",
      hybrid:
        "!text-white !bg-[#292B31] hover:!bg-[#FF6636] transition duration-100 ease-in hover:border-[#FF6636] hover:shadow-lg hover:shadow-2xl hover:shadow-[#FF6636]",
    },
  },
  defaultVariants: {
    variant: "primary",
  },
});

type variants = VariantProps<typeof button>;

type IProps = {
  icon?: ReactNode;
  loading?: boolean;
  containerClassName?: string;
  buttonType?: "dark" | "light";
} & (React.ComponentProps<"button"> & variants);

/**
 * Renders a button component with customizable properties.
 *
 * @param {IProps} ButtonProps - The properties of the button component.
 * @param {React.ReactNode} ButtonProps.children - The content of the button.
 * @param {Function} ButtonProps.onClick - The function to be called when the button is clicked.
 * @param {string} ButtonProps.className - The additional class name for the button.
 * @param {string} ButtonProps.type - The type of the button.
 * @param {boolean} ButtonProps.disabled - Indicates if the button is disabled.
 * @param {boolean} ButtonProps.loading - Indicates if the button is in a loading state.
 * @param {React.ReactNode} ButtonProps.icon - The icon to be displayed in the button.
 * @param {string} ButtonProps.variant - The variant style of the button.
 * @return {JSX.Element} - The rendered button component.
 */
const Button: React.ForwardRefExoticComponent<any> = React.forwardRef<
  HTMLDivElement,
  IProps
>(
  (
    {
      children,
      onClick,
      className,
      type,
      disabled,
      loading,
      icon,
      variant,
      buttonType = "dark",
      containerClassName,
      ...props
    }: IProps,
    ref,
  ) => {
    const disabledOrLoading = disabled || loading;
    const buttonClassName = twMerge(
      button({ variant, disabled: disabledOrLoading }),
      className,
    );

    return (
      <button
        className={cx(
          twMerge(
            `
            py-[8px] px-[30px] opacity-80 hover:opacity-100 !font-bold !font-inter text-base rounded-full relative z-[1] cursor-pointer overflow-hidden
            disabled:opacity-70 disabled:cursor-default
          `,
            buttonClassName,
          ),
          {
            "opacity-80 !cursor-default": disabled || loading,
          },
        )}
        onClick={onClick}
        type={type}
        disabled={disabled}
        style={
          containerClassName?.includes("bg-transparent")
            ? { color: "white" }
            : {}
        }
      >
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";

export default Button;
