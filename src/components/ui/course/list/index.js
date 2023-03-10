

export default function List({courses, children, ethPrice}) {
  return (
    <section className="grid md:grid-cols-1 lg:grid-cols-2 gap-4 mb-5">
      { courses.map(course =>
        children(course)
      )}
    </section>
  )
}
