
'use client'

import { Calendar, dateFnsLocalizer, Views, type Event } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import sk from 'date-fns/locale/sk';
import { useMemo } from 'react';

const locales = {
  'sk': sk,
}

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 1 }), // Monday
  getDay,
  locales,
})

// Custom translations for calendar
const messages = {
  allDay: 'Celý deň',
  previous: '<',
  next: '>',
  today: 'Dnes',
  month: 'Mesiac',
  week: 'Týždeň',
  day: 'Deň',
  agenda: 'Agenda',
  date: 'Dátum',
  time: 'Čas',
  event: 'Udalosť',
  showMore: (total: number) => `+ Zobraziť ďalšie (${total})`,
};

interface CalendarClientProps {
    initialEvents: Event[];
}

export function CalendarClient({ initialEvents }: CalendarClientProps) {
    const events = useMemo(() => initialEvents.map(e => ({...e, start: new Date(e.start as Date), end: new Date(e.end as Date)})), [initialEvents]);
    
    return (
        <>
            {events.length > 0 ? (
                 <Calendar
                    localizer={localizer}
                    events={events}
                    startAccessor="start"
                    endAccessor="end"
                    style={{ height: '100%' }}
                    views={[Views.MONTH, Views.WEEK, Views.DAY, Views.AGENDA]}
                    culture='sk'
                    messages={messages}
                />
            ) : (
                 <div className="h-full flex items-center justify-center bg-muted/50 rounded-lg">
                    <p className="text-muted-foreground">V kalendári nie sú žiadne zákazky.</p>
                </div>
            )}
        </>
    )
}
