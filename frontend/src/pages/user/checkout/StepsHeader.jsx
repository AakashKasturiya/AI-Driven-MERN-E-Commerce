const steps = [
    {
        id: 1,
        title: "Shipping",
    },
    {
        id: 2,
        title: "Payment",
    },
    {
        id: 3,
        title: "Review",
    },
];

export const StepsHeader = ({ currentStep = 1 }) => {
    return (
        <div className="flex items-center gap-2 md:gap-4 mb-10 max-w-lg">
            {steps.map((step, index) => {
                const active = currentStep === step.id;
                const completed = currentStep > step.id;

                return (
                    <div
                        key={step.id}
                        className="flex items-center gap-2 md:gap-4 flex-1"
                    >
                        <div className="flex flex-col items-center">
                            <div
                                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold transition-all duration-300 ${active || completed
                                        ? "bg-charcoal text-white"
                                        : "bg-gray-100 text-medium-gray"
                                    }`}
                            >
                                {completed ? (
                                    <i className="ri-check-line text-sm" />
                                ) : (
                                    step.id
                                )}
                            </div>

                            <span
                                className={`text-[10px] mt-1.5 hidden md:block ${active || completed
                                        ? "text-charcoal font-medium"
                                        : "text-medium-gray"
                                    }`}
                            >
                                {step.title}
                            </span>
                        </div>

                        {index !== steps.length - 1 && (
                            <div
                                className={`h-px flex-1 transition-all duration-300 ${completed ? "bg-charcoal" : "bg-gray-200"
                                    }`}
                            />
                        )}
                    </div>
                );
            })}
        </div>
    );
};