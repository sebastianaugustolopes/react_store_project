import React from 'react'
import { Link } from 'react-router-dom'

type ButtonProps = {
  type: 'button'
  title: string
  onClick?: () => void
  children: React.ReactNode
}

type LinkProps = {
  type: 'link'
  title: string
  to: string
  children: React.ReactNode
}

type Props = ButtonProps | LinkProps

const linkStyles = `bg-blue-500 text-white font-medium text-sm 
  px-4 py-2 rounded-md inline-flex items-center justify-center space-x-2 
  shadow-md hover:shadow-lg transition duration-200 
  hover:bg-blue-600 
  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-blue-100 
  dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-offset-gray-900`

const buttonStyles = `gap-2 bg-transparent text-white font-medium 
  px-4 py-2 rounded-md inline-flex items-center justify-center 
  shadow-md hover:shadow-lg transition duration-200 
  hover:bg-gray-100 dark:hover:bg-gray-700 
  focus:outline-none focus:ring-0.1 focus:ring-white focus:ring-offset-2`

const Button = (props: Props) => {
  if (props.type === 'button') {
    return (
      <button type="button" onClick={props.onClick} title={props.title} className={buttonStyles}>
        {props.children}
      </button>
    )
  }

  return (
    <Link to={props.to} title={props.title} className={linkStyles}>
      {props.children}
    </Link>
  )
}

export default Button
