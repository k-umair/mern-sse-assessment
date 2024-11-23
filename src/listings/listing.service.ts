import listingSchema, { IListing } from "./listing.schema";

class ListingService {
  public async createListing(
    sellerId: string,
    listingData: Partial<IListing>
  ): Promise<IListing> {
    const newListing = new listingSchema({
      ...listingData,
      sellerId,
      status: "active",
    });
    await newListing.save();
    return newListing;
  }

  public async updateListing(
    id: string,
    sellerId: string,
    updateData: Partial<IListing>
  ): Promise<IListing | null> {
    const listing = await listingSchema.findOne({ _id: id, sellerId });
    if (!listing) {
      throw new Error(
        "Listing not found or you do not have permission to update it"
      );
    }

    Object.assign(listing, updateData);
    await listing.save();
    return listing;
  }

  public async deleteListing(id: string, sellerId: string): Promise<string> {
    const listing = await listingSchema.findOne({ _id: id, sellerId });
    if (!listing) {
      throw new Error(
        "Listing not found or you do not have permission to delete it"
      );
    }

    await listing.deleteOne();
    return "Listing deleted successfully";
  }

  public async markOrderCompleted(
    id: string,
    sellerId: string
  ): Promise<IListing | null> {
    const listing = await listingSchema.findOne({ _id: id, sellerId });
    if (!listing) {
      throw new Error(
        "Listing not found or you do not have permission to complete the order"
      );
    }

    listing.status = "completed";
    await listing.save();
    return listing;
  }
}

export default new ListingService();
