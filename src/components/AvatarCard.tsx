

export function AvatarCard() {

    return (
        <div
            className="rounded-lg cursor-pointer transition-all overflow-hidden aspect-square"
            style={{
                backgroundColor: 'var(--color-bg-card)',
                border: '1px solid var(--color-border)'
            }}
        >
            <img
                src="https://github.com/Bouhzial.png"
                alt="Ahmed BOUHZILA"
                className="w-full h-full object-cover"
            />
        </div>
    );
}
