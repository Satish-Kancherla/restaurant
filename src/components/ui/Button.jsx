import React from 'react'


import { Slot } from "@radix-ui/react-slot"
import { cva} from "class-variance-authority"
import { cn } from "../../lib/utils"

const buttonVariants = cva(
  "flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 hover:bg-opacity-90 active:bg-opacity-60 active:scale-95  ",
  {
    variants: {
      variant: {
        default: "bg-orange-600 text-white ",
        danger:
          "bg-theme-danger/20 text-theme-danger hover:bg-theme-danger/40",
        outline:
          "border border-theme-2 bg-theme-2 bg-opacity-20 hover:bg-opacity-50 border-theme-2 text-theme-1 active:bg-opacity-65",

        ghost: "hover:bg-theme-2 hover:bg-opacity-50 text-theme-text",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 px-4 min-w-10 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)


const Button = React.forwardRef(
  ({ className, variant , size, asChild = false,iconleft,iconright,children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {iconleft&&iconleft}
        {children}
        {iconright&&iconright}
      </Comp>
    )
  }
)
Button.displayName = "Button"

export default Button
