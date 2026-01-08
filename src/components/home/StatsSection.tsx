const stats = [
  { value: "130+", label: "Manufacturing Machines" },
  { value: "100+", label: "Skilled Workers" },
  { value: "10K+", label: "Monthly Capacity" },
  { value: "15+", label: "Years Experience" },
];

export function StatsSection() {
  return (
    <section className="py-16 bg-primary">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="text-center animate-fade-up opacity-0"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="text-4xl md:text-5xl font-heading font-bold text-primary-foreground mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-primary-foreground/80 uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
