function SimpleSider({ params }) {
    return (
        <div className="bg-background py-10 mb-6 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-accent-primary/5 via-accent-secondary/5 to-accent-tertiary/5"></div>
            <h1 className="text-2xl font-medium text-white relative z-10">{params}</h1>
        </div>
    );
}

export default SimpleSider;