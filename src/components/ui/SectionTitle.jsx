const SectionTitle = ({ 
  title, 
  subtitle, 
  description, 
  centered = true, 
  gradient = false,
  className = '' 
}) => {
  return (
    <div className={`${centered ? 'text-center' : 'text-left'} mb-12 ${className}`}>
      {subtitle && (
        <p className="text-construction font-semibold text-sm uppercase tracking-wide mb-2">
          {subtitle}
        </p>
      )}
      <h2 className={`heading-lg ${gradient ? 'text-gradient-brick' : 'text-foreground'} mb-4`}>
        {title}
      </h2>
      {description && (
        <p className="body-lg text-muted-foreground max-w-3xl mx-auto">
          {description}
        </p>
      )}
    </div>
  );
};

export default SectionTitle;