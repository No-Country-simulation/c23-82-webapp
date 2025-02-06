interface Props {
    title: string;
    category: string;
    location: string;
    image: string;
}

function CategoryCard({ title, category, location, image }: Props) {
    return (
        <div className="relative w-44 bg-white rounded-2xl shadow-md overflow-hidden">

            <img src={image} alt={title} className="w-44 h-44 object-cover" />

            {/* Contenido */}
            <div className="p-4">
                <p className="text-xs text-gray-500 uppercase text-left mb-4">{category}</p>
                <h3 className="text-sm font-bold text-gray-800 text-left underline mb-1">{title}</h3>
                <p className="text-sm text-gray-600 text-left">{location}</p>
            </div>
        </div>
    );
}

export default CategoryCard;