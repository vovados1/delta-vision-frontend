import { clsx } from "clsx"

export function H1({ className, children, ...props }: React.ComponentPropsWithoutRef<"h1">) {
  return (
    <h1
      className={clsx("scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance", className)}
      {...props}
    >
      {children}
    </h1>
  )
}

export function H2({ className, children, ...props }: React.ComponentPropsWithoutRef<"h2">) {
  return (
    <h2
      className={clsx("scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0", className)}
      {...props}
    >
      {children}
    </h2>
  )
}

export function H3({ className, children, ...props }: React.ComponentPropsWithoutRef<"h3">) {
  return (
    <h3 className={clsx("scroll-m-20 text-2xl font-semibold tracking-tight", className)} {...props}>
      {children}
    </h3>
  )
}

export function H4({ className, children, ...props }: React.ComponentPropsWithoutRef<"h4">) {
  return (
    <h4 className={clsx("scroll-m-20 text-xl font-semibold tracking-tight", className)} {...props}>
      {children}
    </h4>
  )
}

export function Paragraph({ className, children, ...props }: React.ComponentPropsWithoutRef<"p">) {
  return (
    <p className={clsx("leading-7 [&:not(:first-child)]:mt-6", className)} {...props}>
      {children}
    </p>
  )
}

export function Small({ className, children, ...props }: React.ComponentPropsWithoutRef<"small">) {
  return (
    <small className={clsx("text-sm leading-none font-medium", className)} {...props}>
      {children}
    </small>
  )
}
