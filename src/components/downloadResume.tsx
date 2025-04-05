'use client'

import { meta } from '@/data'
import { Download } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'
import { Button } from './ui/button'

export function DownloadResume() {
  const [isGenerating, setIsGenerating] = useState(false)

  const downloadPDF = async () => {
    setIsGenerating(true)

    try {
      toast.info('Generating Resume')
      const jsPDF = (await import('jspdf')).default
      const html2canvas = (await import('html2canvas-pro')).default

      // Target element - typically the main content container
      const element = document.body

      // Store original styles to restore them later
      const originalStyle = {
        overflow: document.body.style.overflow,
        height: document.body.style.height,
        position: document.body.style.position,
      }

      // Temporarily modify the document for better capturing
      document.body.style.overflow = 'visible'
      document.body.style.height = 'auto'
      document.body.style.position = 'relative'

      // Get the full height of the document
      const scrollHeight = Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.offsetHeight,
        document.body.clientHeight,
        document.documentElement.clientHeight,
      )

      // Create canvas with the full document height
      const canvas = await html2canvas(element, {
        scale: 2, // Higher scale for better quality
        useCORS: true, // Allow cross-origin images
        logging: false,
        windowHeight: scrollHeight,
        scrollY: 0,
        height: scrollHeight,
        windowWidth: document.documentElement.clientWidth,
        width: document.documentElement.clientWidth,
        // This ensures all content is captured, even if scrolled out of view
        onclone: (clonedDoc) => {
          const clonedBody = clonedDoc.body
          clonedBody.style.overflow = 'visible'
          clonedBody.style.height = 'auto'
        },
      })

      // Define PDF dimensions
      const imgWidth = 210 // A4 width in mm
      const pageHeight = 297 // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width

      // Create PDF instance
      // eslint-disable-next-line new-cap
      const pdf = new jsPDF('p', 'mm', 'a4')
      let position = 0

      // Add image to PDF, creating new pages if content overflows
      for (let i = 0; i <= canvas.height / canvas.width * imgWidth / pageHeight; i++) {
        // This is the position of the cutoff for each page
        position = -i * pageHeight

        // Add new page if this isn't the first page
        if (i > 0)
          pdf.addPage()

        // Add the image, positioning it to show the next section
        pdf.addImage(
          canvas.toDataURL('image/jpeg', 0.95), // Slightly compress to reduce file size
          'JPEG',
          0,
          position,
          imgWidth,
          imgHeight,
        )
      }

      // Generate and download the PDF
      pdf.save(`${meta.name.replace(' ', '_')}_Resume.pdf`)

      // Restore original body styles
      document.body.style.overflow = originalStyle.overflow
      document.body.style.height = originalStyle.height
      document.body.style.position = originalStyle.position
    }
    catch (error) {
      console.error('Error generating PDF:', error)
      toast.error('Failed to generate PDF. Please try again')
    }
    finally {
      setIsGenerating(false)
      toast.success('Resume generation completed')
    }
  }

  return (
    <Button
      type="button"
      onClick={downloadPDF}
      disabled={isGenerating}
      aria-label="Theme Toggle"
      className="fixed top-12 right-0 py-2 px-8 rounded-full shadow-2xl cursor-pointer print:hidden"
    >
      <Download className="h-4 w-4" />
    </Button>
  )
}
DownloadResume.displayName = 'DownloadResume'
