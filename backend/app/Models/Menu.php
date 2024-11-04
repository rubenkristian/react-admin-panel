<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Menu extends Model
{
    use HasFactory;

    protected $fillable = [
        'depth',
        'name',
        'parent_id'
    ];

    public static function boot()
    {
        parent::boot();

        static::creating(function ($menu) {
            $menu->slug = self::generateUniqueSlug($menu->name);
        });

        static::updating(function ($menu) {
            // Only regenerate slug if the title has changed
            if ($menu->isDirty('name')) {
                $menu->slug = self::generateUniqueSlug($menu->name, $menu->id);
            }
        });
    }

    // Generate and ensure unique slug
    public static function generateUniqueSlug($name, $id = null)
    {
        $slug = Str::slug($name);
        $originalSlug = $slug;
        $count = 1;

        // Check if slug already exists
        // The `where` clause also includes a check for the current ID
        while (self::where('slug', $slug)->where('id', '!=', $id)->exists()) {
            $slug = $originalSlug . '-' . $count;
            $count++;
        }

        return $slug;
    }

    public function children()
    {
        return $this->hasMany(Menu::class, 'parent_id');
    }

    public function childrens()
    {
        return $this->hasMany(Menu::class, 'parent_id')->with(['childrens']);
    }

    public function parent()
    {
        return $this->belongsTo(Menu::class, 'parent_id');
    }
}
