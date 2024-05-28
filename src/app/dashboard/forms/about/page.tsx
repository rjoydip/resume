import { AboutForm } from './about-form'
import { Separator } from '@/components/ui/separator'

export default function EducationPage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">About</h3>
        <p className="text-sm text-muted-foreground">
          Add your personal details
        </p>
      </div>
      <Separator />
      <AboutForm />
    </div>
  )
}
