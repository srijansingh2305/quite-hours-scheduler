export function validateQuietHour(data: {
  title: string;
  startTime: string;
  endTime: string;
}) {
  const errors: string[] = []

  if (!data.title || data.title.trim().length === 0) {
    errors.push('Title is required')
  }

  if (!data.startTime) {
    errors.push('Start time is required')
  }

  if (!data.endTime) {
    errors.push('End time is required')
  }

  if (data.startTime && data.endTime) {
    const start = new Date(data.startTime)
    const end = new Date(data.endTime)
    
    if (start >= end) {
      errors.push('End time must be after start time')
    }

    if (start < new Date()) {
      errors.push('Start time must be in the future')
    }
  }

  return {
    isValid: errors.length === 0,
    errors
  }
}