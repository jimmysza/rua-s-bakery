
import { ChefHat, Edit2, Eye, EyeOff, Layers, Plus, Sparkles, Trash2, X } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { generateCatchyDescription } from '../services/geminiService';
import { supabase } from '../src/lib/supabase';
import { Product } from '../types';


const AdminDashboard: React.FC = () => {


  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState<Omit<Product, 'id' | 'createdAt' | 'images'>>({
    name: '',
    price: '',
    description: '',
    category: 'Pasteles',
    isVisible: true,
    stock: '10',
    preparation: '',
    materials: ''
  });


  const [existingImages, setExistingImages] = useState<string[]>([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const uploadImages = async (): Promise<string[]> => {
    const uploadedUrls: string[] = [];

    for (const file of imageFiles) {
      const fileExt = file.name.split('.').pop();
      const fileName = `${crypto.randomUUID()}.${fileExt}`;
      const filePath = `products/${fileName}`;

      const { error } = await supabase.storage
        .from('products')
        .upload(filePath, file);

      if (error) {
        console.error('Error subiendo imagen:', error.message);
        continue;
      }

      const { data } = supabase.storage
        .from('products')
        .getPublicUrl(filePath);

      uploadedUrls.push(data.publicUrl);
    }

    return uploadedUrls;
  };


  const fetchProducts = async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error cargando productos:', error.message);
    } else {
      setProducts(data as Product[]);
    }

    setLoading(false);
  };



  const handleCreateProduct = async () => {
    const uploadedImages = await uploadImages();

    const payload = {
      name: formData.name,
      price: Number(formData.price),
      description: formData.description,
      images: uploadedImages, // 👈 AQUÍ
      category: formData.category,
      isVisible: formData.isVisible,
      stock: Number(formData.stock),
      preparation: formData.preparation,
      materials: formData.materials,
      user_id: (await supabase.auth.getUser()).data.user?.id
    };

    if (!payload.user_id) {
      console.error("No user logged in to create product");
      return;
    }

    const { error } = await supabase.from('products').insert(payload);
    if (error) {
      console.error(error.message);
      return;
    }

    await fetchProducts();
    resetForm();
    setIsModalOpen(false);
  };




  const handleUpdateProduct = async () => {
    if (!editingId) return;

    const newUploadedImages = await uploadImages();
    const finalImages = [...existingImages, ...newUploadedImages];

    const payload: any = {
      name: formData.name,
      price: Number(formData.price),
      description: formData.description,
      category: formData.category,
      isVisible: formData.isVisible,
      stock: Number(formData.stock),
      preparation: formData.preparation,
      materials: formData.materials,
      images: finalImages
    };

    await supabase.from('products').update(payload).eq('id', editingId);

    await fetchProducts();
    resetForm();
    setIsModalOpen(false);
  };



  // Bloquear scroll del body cuando el modal está abierto
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen]);

  const resetForm = () => {
    setFormData({
      name: '',
      price: '',
      description: '',
      category: 'Pasteles',
      isVisible: true,
      stock: '10',
      preparation: '',
      materials: ''
    });
    setImageFiles([]);
    setExistingImages([]);
    setEditingId(null);
  };


  const handleEdit = (p: Product) => {
    setFormData({
      name: p.name,
      price: p.price.toString(),
      description: p.description,
      category: p.category,
      isVisible: p.isVisible,
      stock: p.stock.toString(),
      preparation: p.preparation || '',
      materials: p.materials || ''
    });
    setExistingImages(p.images || []);
    setEditingId(p.id);
    setIsModalOpen(true);
  };



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (editingId) {
      await handleUpdateProduct();
    } else {
      await handleCreateProduct();
    }
  };


  const handleAiDescription = async () => {
    if (!formData.name) return;
    setIsGenerating(true);
    const desc = await generateCatchyDescription(formData.name);
    setFormData(prev => ({ ...prev, description: desc }));
    setIsGenerating(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 h-[calc(100vh-5rem)]">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h2 className="text-4xl font-bold font-serif text-gray-800">Catálogo Maestro</h2>
          <p className="text-gray-500 italic mt-1">Gestiona tus creaciones artesanales aquí.</p>
        </div>
        <button
          onClick={() => { resetForm(); setIsModalOpen(true); }}
          className="flex items-center justify-center px-6 py-3 bg-pink-500 text-white rounded-xl font-bold hover:bg-pink-600 transition-all shadow-lg shadow-pink-100 whitespace-nowrap"
        >
          <Plus className="h-5 w-5 mr-2" />
          Añadir Producto
        </button>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          {loading && (
            <div className="p-6 text-center text-gray-400 font-semibold">
              Cargando productos...
            </div>
          )}

          <table className="w-full text-left">
            <thead className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider font-semibold">
              <tr>
                <th className="px-6 py-4">Producto</th>
                <th className="px-6 py-4">Stock</th>
                <th className="px-6 py-4">Precio</th>
                <th className="px-6 py-4">Estado</th>
                <th className="px-6 py-4 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-pink-50/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <img
                        className="h-12 w-12 rounded-lg object-cover mr-4"
                        src={product.images?.[0]}
                        alt=""
                        loading="lazy"
                      />
                      <div>
                        <div className="font-bold text-gray-900">{product.name}</div>
                        <div className="text-gray-400 text-xs font-medium uppercase tracking-tighter">{product.category} ({product.images?.length || 0} fotos)</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`font-bold ${product.stock > 5 ? 'text-gray-600' : 'text-orange-500'}`}>
                      {product.stock}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-bold text-gray-700">
                    ${product.price.toFixed(2)}
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={async () => {
                        const { error } = await supabase
                          .from('products')
                          .update({ isVisible: !product.isVisible })
                          .eq('id', product.id);

                        if (error) {
                          console.error(error.message);
                        } else {
                          fetchProducts();
                        }
                      }}

                      className={`flex items-center px-3 py-1 rounded-full text-xs font-bold transition-all ${product.isVisible
                        ? 'bg-green-50 text-green-600'
                        : 'bg-gray-100 text-gray-400'
                        }`}
                    >
                      {product.isVisible ? <Eye className="h-3 w-3 mr-1" /> : <EyeOff className="h-3 w-3 mr-1" />}
                      {product.isVisible ? 'Visible' : 'Oculto'}
                    </button>
                  </td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <button
                      onClick={() => handleEdit(product)}
                      className="p-2 text-gray-400 hover:text-pink-500 transition-colors"
                    >
                      <Edit2 className="h-5 w-5" />
                    </button>
                    <button
                      onClick={async () => {
                        const { error } = await supabase
                          .from('products')
                          .delete()
                          .eq('id', product.id);

                        if (error) {
                          console.error('Error eliminando producto:', error.message);
                        } else {
                          fetchProducts();
                        }
                      }}
                      className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={() => setIsModalOpen(false)} />
          <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto transform transition-all animate-fade-in">
            <div className="p-8">
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-3xl font-bold font-serif text-gray-800">
                  {editingId ? 'Editar Producto' : 'Nuevo Producto'}
                </h3>
                <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                  <X className="h-6 w-6 text-gray-400" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-gray-700 mb-2">Nombre del Postre</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-pink-400 text-gray-900"
                    placeholder="Ej: Tarta Tatín de Manzana"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Precio ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-pink-400 text-gray-900"
                    placeholder="0.00"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Stock Inicial</label>
                  <input
                    type="number"
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-pink-400 text-gray-900"
                    placeholder="10"
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <div className="flex justify-between items-center mb-2">
                    <label className="block text-sm font-bold text-gray-700">Descripción Corta</label>
                    <button
                      type="button"
                      onClick={handleAiDescription}
                      disabled={!formData.name || isGenerating}
                      className="text-xs flex items-center px-3 py-1 bg-purple-50 text-purple-600 rounded-full hover:bg-purple-100 transition-colors"
                    >
                      <Sparkles className={`h-3 w-3 mr-1 ${isGenerating ? 'animate-spin' : ''}`} />
                      IA
                    </button>
                  </div>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-pink-400 min-h-[80px] text-gray-900"
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center">
                    <ChefHat className="h-4 w-4 mr-2" /> Información de Preparación
                  </label>
                  <textarea
                    value={formData.preparation}
                    onChange={(e) => setFormData({ ...formData, preparation: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-pink-400 min-h-[80px] text-gray-900"
                    placeholder="Describe cómo se elabora este postre..."
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center">
                    <Layers className="h-4 w-4 mr-2" /> Materiales & Ingredientes
                  </label>
                  <textarea
                    value={formData.materials}
                    onChange={(e) => setFormData({ ...formData, materials: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-pink-400 min-h-[80px] text-gray-900"
                    placeholder="Lista de ingredientes principales..."
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Galería de Imágenes
                  </label>

                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) => {
                      if (!e.target.files) return;
                      setImageFiles(prev => [...prev, ...Array.from(e.target.files || [])]);
                    }}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl"
                  />
                  <p className="text-xs text-gray-400 mt-1">Puedes seleccionar múltiples archivos para agregar.</p>
                </div>


                <div className="flex flex-wrap gap-3 mt-4 md:col-span-2">
                  {/* Existing Images */}
                  {existingImages.map((imgUrl, idx) => (
                    <div key={`existing-${idx}`} className="relative group">
                      <img
                        src={imgUrl}
                        className="h-20 w-20 rounded-xl object-cover border border-gray-200"
                        alt="existing"
                      />
                      <button
                        type="button"
                        onClick={() => setExistingImages(prev => prev.filter((_, i) => i !== idx))}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity shadow-md"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}

                  {/* New Files Preview */}
                  {imageFiles.map((file, idx) => (
                    <div key={`new-${idx}`} className="relative group">
                      <img
                        src={URL.createObjectURL(file)}
                        className="h-20 w-20 rounded-xl object-cover border border-green-200 ring-2 ring-green-100"
                        alt="preview"
                      />
                      <button
                        type="button"
                        onClick={() => setImageFiles(prev => prev.filter((_, i) => i !== idx))}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity shadow-md"
                      >
                        <X className="h-3 w-3" />
                      </button>
                      <span className="absolute bottom-0 left-0 right-0 bg-green-500/80 text-white text-[9px] font-bold text-center py-0.5 rounded-b-xl">NUEVA</span>
                    </div>
                  ))}
                </div>



                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-gray-700 mb-2">Categoría</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-pink-400 text-gray-900"
                  >
                    <option>Pasteles</option>
                    <option>Postres</option>
                    <option>Tartas</option>
                    <option>Galletería</option>
                    <option>Bebidas</option>
                  </select>
                </div>

                <div className="md:col-span-2 flex items-center space-x-3 bg-pink-50/50 p-4 rounded-xl">
                  <input
                    type="checkbox"
                    id="isVisible"
                    checked={formData.isVisible}
                    onChange={(e) => setFormData({ ...formData, isVisible: e.target.checked })}
                    className="h-5 w-5 rounded text-pink-500 focus:ring-pink-400 border-gray-300"
                  />
                  <label htmlFor="isVisible" className="text-sm font-bold text-gray-700 cursor-pointer">
                    Habilitar visibilidad en la tienda
                  </label>
                </div>

                <div className="md:col-span-2 pt-6">
                  <div className="md:col-span-2 pt-6">
                    <button
                      type="submit"
                      className="w-full py-4 bg-pink-500 text-white rounded-2xl font-bold hover:bg-pink-600 transition-all shadow-xl"
                    >
                      {editingId ? 'Guardar Cambios' : 'Publicar Producto'}
                    </button>

                  </div>

                </div>
              </form>
            </div>
          </div>
        </div >
      )}
    </div >
  );
};

export default AdminDashboard;
