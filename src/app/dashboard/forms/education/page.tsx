import { EducationForm } from './education-form'
import { Separator } from '@/components/ui/separator'

export default function EducationPage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Education</h3>
        <p className="text-sm text-muted-foreground">
          Add your education details
        </p>
      </div>
      <Separator />
      <EducationForm />
    </div>
  )
}
