import { motion } from "framer-motion"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {  GitBranch, LucideBanknote, Mail } from "lucide-react"
import { cn } from "@/lib/utils" // from shadcn — combines clsx + tailwind-merge

export function ProfileCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="flex justify-center items-center min-h-screen bg-gradient-to-b from-background to-muted/30"
    >
      <Card className="w-[360px] rounded-2xl shadow-lg border border-border/40 bg-background/60 backdrop-blur-lg">
        <CardHeader className="text-center space-y-2">
          <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-tr from-primary to-secondary flex items-center justify-center text-white text-2xl font-bold">
            WO
          </div>
          <CardTitle className="text-xl font-semibold">Wisdom Obumneme</CardTitle>
          <p className="text-sm text-muted-foreground">Web Developer & Designer</p>
        </CardHeader>

        <CardContent className="text-center text-sm text-muted-foreground">
          <p>
            I build modern, fast, and beautiful web experiences using React, Tailwind, and Supabase.
          </p>
        </CardContent>

        <CardFooter className="flex justify-center gap-4 pt-4">
          <Button variant="ghost" size="icon">
            <GitBranch className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon" >
            <LucideBanknote className="w-6 h-5"  color="orange"/>
          </Button>
          <Button variant="ghost" size="icon">
            <Mail className="w-5 h-5" />
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}
