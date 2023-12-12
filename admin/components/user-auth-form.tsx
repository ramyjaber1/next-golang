"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOffIcon } from "lucide-react"
import { _axios } from "@/lib/axios"
import { useRouter } from "next/navigation"
import { login } from "@/api-requests/auth"

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> { }

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [fields, setFields] = React.useState({ email: "", password: "" })
  const router = useRouter()
  const [passwordType, setPasswordType] = React.useState('password')
  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault()
    setIsLoading(true)
    const response = await login(fields)
    if (response?.ok) {
      router.push("/");
    }

    setIsLoading(false)

  }
  const handlePasswordTypeChange = () => {
    if (passwordType === "password") {
      setPasswordType('text')
    } else {
      setPasswordType('password')
    }
  }
  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={onSubmit}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              onChange={(e) => setFields({ ...fields, email: e.target.value })}
              autoCorrect="off"
              disabled={isLoading}
            />
            <div className="relative">
              <Input
                id="password"
                placeholder="your secret password"
                onChange={(e) => setFields({ ...fields, password: e.target.value })}
                type={passwordType}
                autoCapitalize="none"
                autoComplete="email"
                autoCorrect="off"
                disabled={isLoading}
              />
              <span className="absolute right-3 top-[10px] cursor-pointer">{passwordType === "password" ?
                <Eye onClick={handlePasswordTypeChange} className="w-5 h-5" />
                :
                <EyeOffIcon onClick={handlePasswordTypeChange} className="w-5 h-5" />
              }
              </span>
            </div>
          </div>
          <Button disabled={isLoading} className="mt-5">
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4  animate-spin" />
            )}
            Sign In with Email
          </Button>
        </div>
      </form>
    </div>
  )
}
