import type React from 'react';
import { useEffect, useState } from 'react';

interface ComplementaryColor {
    hex: string;
    name: string;
}

interface Color {
    hex: string;
    name: string;
    comp: ComplementaryColor[];
}

const MyColors: React.FC = () => {
    const [colors, setColors] = useState<Color[]>([]);

    useEffect(() => {
        const fetchColors = async () => {
            try {
                const response = await fetch('./Data.json');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data: Color[] = await response.json();

                setColors(data);
            } catch (error) {
                console.error('Error fetching color data:', error);
            }
        };
        //
        fetchColors();
    }, []);

    return (
        <div className="color-container">
            <h1>Color Palette</h1>
            <div>
                {colors.length > 0 ? (
                    colors.map(color => (
                        <div className="frame" key={color.hex}>
                            <div>
                                <div className="frame1">
                                    <h3>Primary Color:</h3>
                                    <h2>{color.name}</h2>
                                    <p>Hex: #{color.hex}</p>
                                </div>

                                <div className="frame2">
                                    <h3>Complementary Colors:</h3>
                                    {color.comp.map(compColor => (
                                        <div key={compColor.hex}>
                                            <h4>{compColor.name}</h4>
                                            <p>Hex: #{compColor.hex}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No colors available.</p>
                )}
            </div>
        </div>
    );
};

export default MyColors;
