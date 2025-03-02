function SimpleSider({ params }) {
    return (
        <div className="bg-gradient-to-r from-background-tertiary via-background-secondary to-background-tertiary h-32 mb-6 text-center pt-8 font-serif relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-accent-primary/20 via-accent-secondary/20 to-accent-tertiary/20"></div>
            <h1 className="text-3xl text-accent-primary relative z-10">{params}</h1>
        </div>
    );
}

export default SimpleSider;