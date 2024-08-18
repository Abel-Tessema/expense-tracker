import {z} from 'zod';
import {useForm} from 'react-hook-form';
import {zodResolver} from "@hookform/resolvers/zod";

const schema = z.object({
    description: z
        .string()
        .min(3, {message: "Description must be at least 3 characters."}),
    amount: z
        .number({invalid_type_error: "Amount is required."})
        .min(1, {message: "Amount must be at least 1."}),
    category: z
        .string()
        .refine(value =>
            ["Grocery", "Utility", "Entertainment"]
                .includes(value)
        )
});

type Expense = z.infer<typeof schema>;

interface Props {
    onSubmit: (expense: Expense) => void
}

function Form({onSubmit}: Props) {
    const {
        register,
        handleSubmit,
        formState: {errors, isValid},
        reset
    } = useForm<Expense>({resolver: zodResolver(schema)});

    return (
        <form onSubmit={handleSubmit(data => {
            onSubmit(data);
            reset();
        })}>
            <div className="mb-3">
                <label htmlFor="description" className="form-label">Description</label>
                <input
                    {...register("description")}
                    id="description"
                    name="description"
                    type="text"
                    className="form-control"
                />
                {errors.description && (<p className="text-danger">{errors.description.message}</p>)}
            </div>
            <div className="mb-3">
                <label htmlFor="amount" className="form-label">Amount</label>
                <input
                    {...register("amount", {valueAsNumber: true})}
                    id="amount"
                    name="amount"
                    type="number"
                    className="form-control"
                />
                {errors.amount && (<p className="text-danger">{errors.amount.message}</p>)}
            </div>
            <div className="mb-3">
                <label htmlFor="category" className="form-label">Category</label>
                <select
                    {...register("category")}
                    id="category"
                    name="category"
                    className="form-select"
                >
                    <option value="Grocery">Grocery</option>
                    <option value="Utility">Utility</option>
                    <option value="Entertainment">Entertainment</option>
                </select>
                {errors.category && (<p className="text-danger">{errors.category.message}</p>)}
            </div>
            <div className="mb-3">
                <button disabled={!isValid} className="btn btn-primary" type="submit">Submit</button>
            </div>
        </form>
    );
}

export default Form;