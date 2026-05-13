const LogoLoader = ({ label = "Loading..." }: { label?: string }) => (
  <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-background text-foreground">
    <img src="/images/gpc-logo.png" alt="Global Power Church" className="h-20 w-20 rounded-full object-cover shadow-lg animate-pulse" />
    <p className="text-sm font-medium text-muted-foreground">{label}</p>
  </div>
);

export default LogoLoader;