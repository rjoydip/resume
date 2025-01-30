import { today } from '@/data'
import { Card } from '../ui/card'
import { Label } from '../ui/label'
import { Section } from '../ui/section'

export function Declaration({ location, name, shouldShow = false }: { location: string, name: string, shouldShow?: boolean }) {
  return (
    <Section className={`${shouldShow ? 'show' : 'hidden'} print:block`}>
      <Label data-testid="declaration_title" className="text-xl font-bold">Declaration</Label>
      <Card className="border p-3">
        <p className="text-pretty mb-8" data-testid="declaration_text">I hereby declare that the above-mentioned information is correct up to my knowledge and I bear the responsibility for the correctness of the above-mentioned particulars.</p>
        <div className="flex justify-between mb-8">
          <div className="space-y-2 text-pretty">
            <p data-testid="declaration_location">
              Location:
              {' '}
              {location}
            </p>
            <p data-testid="declaration_name">
              Name:
              {' '}
              {name}
            </p>
          </div>
          <div className="space-y-2 text-right">
            <p></p>
            <p data-testid="declaration_date">
              Date:
              {' '}
              {today.getDate()}
              -
              {today.getMonth() + 1}
              -
              {today.getFullYear()}
            </p>
          </div>
        </div>
      </Card>
    </Section>
  )
}
Declaration.displayName = 'Declaration'
